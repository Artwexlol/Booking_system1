// routes/userRoleRoutes.js

const {
  getUserRoles,
  getUserRoleById,
  addUserRole,
  updateUserRoleById,
  deleteUserRoleById,
  getRolesByUserId,
} = require("../controllers/user_roles");

const Item = {
  type: "object",
  properties: {
    user_role_id: { type: "integer" },
    user_id: { type: "integer" },
    role_id: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
  },
};

function UserRoleRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all user-role relations",
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getUserRoles,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get user-role by id",
    response: {
      200: Item,
    },
  },
  handler: getUserRoleById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Create a new user-role relation",
    body: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        role_id: { type: "integer" },
      },
      required: ["user_id", "role_id"],
    },
    response: {
      201: { type: "array", items: Item },
      409: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: addUserRole,
  onRequest: [fastify.authenticate],
};

const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update a user-role relation",
    body: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        role_id: { type: "integer" },
      },
      required: ["user_id", "role_id"],
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
  handler: updateUserRoleById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete user-role by id",
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: deleteUserRoleById,
  onRequest: [fastify.authenticate],
};

// EXTRA: roles for given user
const getRoles = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all roles for a specific user",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            role_id: { type: "integer" },
            role_name: { type: "string" },
            role_desc: { type: "string" },
          },
        },
      },
    },
  },
  handler: getRolesByUserId,
  onRequest: [fastify.authenticate],
};


  fastify.get("/user-roles", getAll);
  fastify.get("/user-roles/:id", getOne);
  fastify.post("/user-roles", post);
  fastify.put("/user-roles/:id", update);
  fastify.delete("/user-roles/:id", del);

  // EXTRA
  fastify.get("/users/:id/roles", getRoles);

  done();
}

module.exports = UserRoleRoutes;
