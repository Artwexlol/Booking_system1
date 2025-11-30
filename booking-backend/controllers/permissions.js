const { knex } = require("../database");


const getPermission = async (req, reply) => {  //get all permission
  try {
    const permission = await knex("permission").select("*");
    reply.send(permission);
  } catch (error) {
    reply.send(error);
  }
};

const getPermissionById = async (req, reply) => {  //get permission by id
  const { permission_id } = req.params;
  try {
    const permission = await knex("permission").select("*").where({ permission_id: permission_id });
    reply.send(permission[0]);
  } catch (error) {
    reply.send(error);
  }
};


const addPermission = async (req, reply) => {  //add new permission
    const { permission_name, permission_desc } = req.body;
    const created_at = new Date();  
    try {
      const newPermission = await knex("permission")
        .insert({
          permission_name,
          permission_desc,
          created_at,  
        })
        .returning('*');
      reply.code(201).send(newPermission);
    } catch (error) {
      reply.send(error);
    }
  };
  
  const updatePermissionById = async (req, reply) => {  //update permission by id
    const { permission_id } = req.params;
    const { permission_name, permission_desc } = req.body;
    const permission = await knex("permission").where({ permission_id: permission_id });
    let permissionUpdate;
    try {
      permissionUpdate = await knex("permission")
        .where({ permission_id: permission_id })
        .update({
          permission_name: permission_name,
          permission_desc:permission_desc,
        });
      reply.code(200).send({ message: `Successfull edit` });
    } catch (error) {
      reply.send(error);
    }
    
  };

const deletePermissionById = async (req, reply) => {  //delete permission by id
  const { permission_id } = req.params;
  try {
    await knex("permission").where({ permission_id: permission_id }).del();
    reply.send({ message: `Permission ${permission_id} has been removed` });
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getPermission,
  getPermissionById,
  addPermission,
  deletePermissionById,
  updatePermissionById
};