const pool = require("../db/db");


const createUser = async (user) => {
  const { email, username, fullname, password } = user;
  try {
    const result = await pool.query(
      "INSERT INTO users (email, username, fullname, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, username, fullname, password]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error)
    throw new Error("Database error occured while creating user");
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", 
    [email]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

module.exports = { createUser, findUserByEmail, findUserById };
