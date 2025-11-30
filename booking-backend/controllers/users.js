// controllers/users.js
const { knex } = require("../database");
const bcrypt = require("bcrypt");

// GET all users
const getUsers = async (req, reply) => {
  try {
    const users = await knex("user").select("user_id", "name", "email", "created_at");
    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

// GET user by id
const getUserById = async (req, reply) => {
  const { id } = req.params;
  try {
    const users = await knex("user").select("user_id", "name", "email", "created_at").where({ user_id: id });
    reply.send(users[0]);
  } catch (error) {
    reply.send(error);
  }
};

// CREATE new user (registration)
const addUser = async (req, reply) => {
  const { name, email, password } = req.body;
  const created_at = new Date();

  try {
    // Check if email already exists
    const existing = await knex("user").where({ email }).first();
    if (existing) {
      return reply.code(409).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await knex("user")
      .insert({ name, email, password: hashedPassword, created_at })
      .returning(["user_id", "name", "email", "created_at"]);

    reply.code(201).send(newUser[0]);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE user
const updateUserById = async (req, reply) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await knex("user").where({ user_id: id }).update(updateData);

    reply.send({ message: "User updated successfully" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE user
const deleteUserById = async (req, reply) => {
  const { id } = req.params;

  try {
    await knex("user").where({ user_id: id }).del();
    reply.send({ message: `User ${id} deleted successfully` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
