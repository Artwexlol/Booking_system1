const {
  getPermission,
  getPermissionById,
  addPermission,
  updatePermissionById,
  deletePermissionById,
} = require("../controllers/permissions");

const Item = {  // Struct for Item
  type: "object",
  properties: {
    permission_id: { type: "integer" },
    permission_name: { type: "string" },
    permission_desc: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
};

function PermissionRoutes(fastify, options, done) {

  const getAll = {
    schema: {
      security: [{ Bearer: [] }],
      description: "Get all permission",
      response: { 200: { type: "array", items: Item } },
    },
    handler: getPermission,
    onRequest: [fastify.authenticate],  // ✅ itt már jó
  };

  const getOne = {
    schema: {
      security: [{ Bearer: [] }],
      description: "Get permission by id",
      response: { 200: Item },
    },
    handler: getPermissionById,
    onRequest: [fastify.authenticate],
  };

  const post = {
    schema: {
      security: [{ Bearer: [] }],
      description: "Add a new permission",
      body: {
        type: "object",
        properties: {
          permission_name: { type: "string" },
          permission_desc: { type: "string" },
        },
        required: ["permission_name", "permission_desc"],
      },
      response: {
        200: { type: "object", properties: { message: { type: "string" } } },
        409: { type: "object", properties: { message: { type: "string" } } },
      },
    },
    handler: addPermission,
    onRequest: [fastify.authenticate],
  };

  const update = {
    schema: {
      security: [{ Bearer: [] }],
      description: "Update permission by id",
      body: {
        type: "object",
        properties: {
          permission_name: { type: "string" },
          permission_desc: { type: "string" },
        },
        required: ["permission_name", "permission_desc"],
      },
      response: { 200: { type: "object", properties: { message: { type: "string" } } } },
    },
    handler: updatePermissionById,
    onRequest: [fastify.authenticate],
  };

  const del = {
    schema: {
      security: [{ Bearer: [] }],
      description: "Delete permission by id",
      response: { 200: { type: "object", properties: { message: { type: "string" } } } },
    },
    handler: deletePermissionById,
    onRequest: [fastify.authenticate],
  };

  fastify.get("/permission", getAll);
  fastify.get("/permission/:permission_id", getOne);
  fastify.post("/permission", post);
  fastify.put("/permission/:permission_id", update);
  fastify.delete("/permission/:permission_id", del);

  done();
}

module.exports = PermissionRoutes;
