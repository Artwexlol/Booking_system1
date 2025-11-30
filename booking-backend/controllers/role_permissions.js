// controllers/rolePermissions.js
const { knex } = require("../database");


// GET all role-permission relations
const getRolePermissions = async (req, reply) => {
  try {
    const data = await knex("role_permission").select("*");
    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

// GET one role-permission by id
const getRolePermissionById = async (req, reply) => {
  const { id } = req.params;
  try {
    const data = await knex("role_permission")
      .select("*")
      .where({ role_permission_id: id });

    reply.send(data[0]);
  } catch (error) {
    reply.send(error);
  }
};

// CREATE new relation
const addRolePermission = async (req, reply) => {
  const { role_id, permission_id } = req.body;

  try {
    const created_at = new Date();

    const newRP = await knex("role_permission")
      .insert({
        role_id,
        permission_id,
        created_at,
      })
      .returning("*");

    reply.code(201).send(newRP);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE relation by id
const updateRolePermissionById = async (req, reply) => {
  const { id } = req.params;
  const { role_id, permission_id } = req.body;

  try {
    await knex("role_permission")
      .where({ role_permission_id: id })
      .update({
        role_id,
        permission_id,
      });

    reply.code(200).send({ message: "Successful edit" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE relation by id
const deleteRolePermissionById = async (req, reply) => {
  const { id } = req.params;

  try {
    await knex("role_permission")
      .where({ role_permission_id: id })
      .del();

    reply.send({ message: `Role-permission ${id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

// EXTRA: Get all permissions for a specific role
const getPermissionsByRoleId = async (req, reply) => {
  const { id } = req.params;

  try {
    const data = await knex("role_permission as rp")
      .join("permission as p", "rp.permission_id", "p.permission_id")
      .select("p.permission_id", "p.permission_name", "p.permission_desc")
      .where("rp.role_id", id);

    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getRolePermissions,
  getRolePermissionById,
  addRolePermission,
  updateRolePermissionById,
  deleteRolePermissionById,
  getPermissionsByRoleId,
};
