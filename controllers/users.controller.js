const Joi = require("joi");
const userService = require("../services/users.service");
const { UserResponse } = require("../dto/User.Response");
// const { password } = require("pg/lib/defaults");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ data: new UserResponse(user) });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = await userService.login(value);
    res.status(200).json({ data: { token: token } });
  } catch (error) {
    if (error.message === "404") {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    if (error.message === "401") {
      return res.status(404).json({ message: "email or password not valid" });
    }
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.user
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ data: new UserResponse(user) });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const { id } = req.user;
    const transactions = await userService.transfer(Number(id));
    res.status(200).json({ data: transactions.rows });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = { createUser, getUserById, login, getProfile, transfer };
