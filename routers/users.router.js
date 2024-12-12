const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/auth.middleware");

//add new user
router.post("/register", userController.createUser);
//get user by id
router.get("/profile", authenticateToken, userController.getProfile);
//login
router.post("/login", userController.login)
//transfer
router.get("/transfer", authenticateToken, userController.transfer)

module.exports = router;
