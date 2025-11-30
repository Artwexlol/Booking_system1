// controllers/roles.js
const { knex } = require("../database");


// GET all roles
const getRole = async (req, reply) => {
  try {
    const roles = await knex("role").select("*");
    reply.send(roles);
  } catch (error) {
    reply.send(error);
  }
};

// GET role by id
const getRoleById = async (req, reply) => {
  const { role_id } = req.params;
  try {
    const role = await knex("role").select("*").where({ role_id });
    reply.send(role[0]);
  } catch (error) {
    reply.send(error);
  }
};

// ADD new role
const addRole = async (req, reply) => {
  const { role_name, role_desc } = req.body;
  const created_at = new Date();
  try {
    const newRole = await knex("role")
      .insert({
        role_name,
        role_desc,
        created_at,
      })
      .returning("*");

    reply.code(201).send(newRole);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE role by id
const updateRoleById = async (req, reply) => {
  const { role_id } = req.params;
  const { role_name, role_desc } = req.body;

  try {
    await knex("role")
      .where({ role_id })
      .update({
        role_name,
        role_desc,
      });

    reply.code(200).send({ message: "Successful edit" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE role by id
const deleteRoleById = async (req, reply) => {
  const { role_id } = req.params;
  try {
    await knex("role").where({ role_id }).del();
    reply.send({ message: `Role ${role_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getRole,
  getRoleById,
  addRole,
  updateRoleById,
  deleteRoleById,
};
