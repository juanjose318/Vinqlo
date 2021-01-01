require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json({
      users: users,
    });
  });
};

exports.deleteUser = (req, res) => {
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
};

exports.createUser = (req, res, next) => {
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
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const host = "http://localhost:3000/api/";
      const url = host + `auth/confirmation/${emailToken}`;

      const mailOptions = {
        subject: "Confirm Email",
        text: "I am sending an email from nodemailer!",
        to: user.email,
        from: process.env.GMAIL_USER,
        html: `Please click on this link to confirm your email: <a href ="${url}">${url}</a>`,
      };
      user
        .save()
        .then((result) => {
          transporter.sendMail(mailOptions);
          res
            .status(201)
            .json({
              message: "User Created!",
              result: result,
            })
            .catch((err) => {
              res.status(404).json({
                message: "Creating user failed" + err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
};

exports.getConfirmationToken = (req, res) => {
  try {
    const userData = jwt.verify(
      req.params.token,
      process.env.JWT_KEY
    );
    const changedStatus = new User({
      _id: userData.user._id,
      status: "confirmed",
    });

    User.update({ _id: userData.user._id }, changedStatus).then(
      (confirmedUser) => {
        if (confirmedUser.nModified > 0) {
          res.status(200).redirect(`${process.env.FRONTEND_URL}/auth/login`);
        } else {
          res.status(304).json({
            message: "Not Verified",
          });
        }
      }
    );
  } catch (err) {
    res.status(404).json({
      message: "Auth failed"
    });
  }
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Couldn't find user",
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
          message: "Auth failed, wrong credentials",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
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
        message: "Auth failed, invalid authentication credentials",
      });
    });
};
