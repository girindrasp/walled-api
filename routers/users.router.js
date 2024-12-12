const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/auth.middleware");

//add new user
router.post("/users", userController.createUser);
//get user by id
router.get("/profile", authenticateToken, userController.getUserById);
//login
router.post("/login", authenticateToken, userController.login)

module.exports = router;
