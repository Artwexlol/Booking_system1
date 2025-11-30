// routes/rolePermissionRoutes.js

const {
  getRolePermissions,
  getRolePermissionById,
  addRolePermission,
  updateRolePermissionById,
  deleteRolePermissionById,
  getPermissionsByRoleId,
} = require("../controllers/role_permissions");

const Item = {
  type: "object",
  properties: {
    role_permission_id: { type: "integer" },
    role_id: { type: "integer" },
    permission_id: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
  },
};

function RolePermissionRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all role-permission relations",
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getRolePermissions,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get role-permission by id",
    response: {
      200: Item,
    },
  },
  handler: getRolePermissionById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Create a new role-permission relation",
    body: {
      type: "object",
      properties: {
        role_id: { type: "integer" },
        permission_id: { type: "integer" },
      },
      required: ["role_id", "permission_id"],
    },
    response: {
      201: { type: "array", items: Item },
      409: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: addRolePermission,
  onRequest: [fastify.authenticate],
};

const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update a role-permission relation",
    body: {
      type: "object",
      properties: {
        role_id: { type: "integer" },
        permission_id: { type: "integer" },
      },
      required: ["role_id", "permission_id"],
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
  handler: updateRolePermissionById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete role-permission by id",
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: deleteRolePermissionById,
  onRequest: [fastify.authenticate],
};

// EXTRA: Get all permissions for a specific role
const getPermissions = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all permissions for a specific role",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            permission_id: { type: "integer" },
            permission_name: { type: "string" },
            permission_desc: { type: "string" },
          },
        },
      },
    },
  },
  handler: getPermissionsByRoleId,
  onRequest: [fastify.authenticate],
};


  fastify.get("/role-permissions", getAll);
  fastify.get("/role-permissions/:id", getOne);
  fastify.post("/role-permissions", post);
  fastify.put("/role-permissions/:id", update);
  fastify.delete("/role-permissions/:id", del);

  // EXTRA ENDPOINT
  fastify.get("/roles/:id/permissions", getPermissions);

  done();
}

module.exports = RolePermissionRoutes;
