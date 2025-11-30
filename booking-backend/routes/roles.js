// routes/roleRoutes.js

const {
  getRole,
  getRoleById,
  addRole,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/roles");

const Item = { // Struct for role
  type: "object",
  properties: {
    role_id: { type: "integer" },
    role_name: { type: "string" },
    role_desc: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
};

function RoleRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all roles",
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getRole,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get role by id",
    response: {
      200: Item,
    },
  },
  handler: getRoleById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Add a new role",
    body: {
      type: "object",
      properties: {
        role_name: { type: "string" },
        role_desc: { type: "string" },
      },
      required: ["role_name", "role_desc"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      409: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: addRole,
  onRequest: [fastify.authenticate],
};

const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update role by id",
    body: {
      type: "object",
      properties: {
        role_name: { type: "string" },
        role_desc: { type: "string" },
      },
      required: ["role_name", "role_desc"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateRoleById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete role by id",
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteRoleById,
  onRequest: [fastify.authenticate],
};


  fastify.get("/role", getAll); // Get all roles
  fastify.get("/role/:role_id", getOne); // Get role by id
  fastify.post("/role", post); // Create new role
  fastify.put("/role/:role_id", update); // Update role
  fastify.delete("/role/:role_id", del); // Delete role
  done();
}

module.exports = RoleRoutes;
