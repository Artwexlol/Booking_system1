// controllers/userRoles.js
const { knex } = require("../database");

// GET all user-role relations
const getUserRoles = async (req, reply) => {
  try {
    const data = await knex("user_role").select("*");
    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

// GET one user-role by id
const getUserRoleById = async (req, reply) => {
  const { id } = req.params;

  try {
    const data = await knex("user_role")
      .select("*")
      .where({ user_role_id: id });

    reply.send(data[0]);
  } catch (error) {
    reply.send(error);
  }
};

// CREATE new relation
const addUserRole = async (req, reply) => {
  const { user_id, role_id } = req.body;

  try {
    const created_at = new Date();

    const newUR = await knex("user_role")
      .insert({
        user_id,
        role_id,
        created_at,
      })
      .returning("*");

    reply.code(201).send(newUR);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE relation by id
const updateUserRoleById = async (req, reply) => {
  const { id } = req.params;
  const { user_id, role_id } = req.body;

  try {
    await knex("user_role")
      .where({ user_role_id: id })
      .update({
        user_id,
        role_id,
      });

    reply.code(200).send({ message: "Successful edit" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE relation by id
const deleteUserRoleById = async (req, reply) => {
  const { id } = req.params;

  try {
    await knex("user_role").where({ user_role_id: id }).del();
    reply.send({ message: `User-role ${id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

// EXTRA: Get all roles for a specific user
const getRolesByUserId = async (req, reply) => {
  const { id } = req.params;

  try {
    const data = await knex("user_role as ur")
      .join("role as r", "ur.role_id", "r.role_id")
      .select("r.role_id", "r.role_name", "r.role_desc")
      .where("ur.user_id", id);

    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getUserRoles,
  getUserRoleById,
  addUserRole,
  updateUserRoleById,
  deleteUserRoleById,
  getRolesByUserId,
};
