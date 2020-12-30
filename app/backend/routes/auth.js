require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const User = require("../models/user");
const app = require("../app");

const router = express.Router();

router.get("/users", (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json({
      users: users,
    });
  });
});

router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((userDeleted) => {
    if (userDeleted.n > 0) {
      res.status(200).json({
        message: "user deleted sucesfully!",
      });
    } else {
      res.status(401).json({
        message: "Couldn't delete post",
      });
    }
  });
});

router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email + req.body.domain,
        password: hash,
        name: req.body.name,
        lastName: req.body.lastName,
        campus: req.body.campus,
        file: req.body.file,
        degree: req.body.degree,
      });

      const emailToken = jwt.sign(
        { user: user },
        "secret_this_should_be_longer",
        { expiresIn: "1d" }
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      const host = "http://localhost:3000/api/";
      const url = host + `auth/confirmation/${emailToken}`;

      const mailOptions = {
        subject: "Confirm Email",
        text: "I am sending an email from nodemailer!",
        to: user.email,
        from: process.env.EMAIL,
        html: `Please click on this link to confirm your email: <a href ="${url}">${url}</a>`,
      }

      transporter.sendMail(mailOptions);
      user.save().then((result) => {
        res.status(201).json({
          message: "User Created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed" + err
      });
    });
  });


router.get("/confirmation/:token", (req, res) => {
  try {
    const userData = jwt.verify(
      req.params.token,
      "secret_this_should_be_longer"
    );
    const changedStatus = new User({
      _id: userData.user._id,
      status: "confirmed",
    });

    User.update({ _id: userData.user._id }, changedStatus).then(
      (confirmedUser) => {
        if (confirmedUser.nModified > 0) {
          res.status(200).redirect(`${process.env.APP}login`);
        } else {
          res.status(304).json({
            message: "Not Verified",
          });
        }
      }
    );
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      } else if (user.status == "pending") {
        return res.status(401).json({
          message: "Auth failed, confirm email first",
        });
      } else {
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
        errror: err,
      });
    });
});

module.exports = router;
