const UserController = require("../controllers/user");

const express = require("express");

const router = express.Router();

router.get("/users", UserController.getUsers);

router.delete("/:id", UserController.deleteUser);

router.post("/signup", UserController.createUser );

router.get("/confirmation/:token", UserController.getConfirmationToken);

router.post("/login", UserController.login);

module.exports = router;
