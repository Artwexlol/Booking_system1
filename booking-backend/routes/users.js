// routes/userRoutes.js
const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

const Item = {
  type: "object",
  properties: {
    user_id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
};

function UserRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all users",
    response: { 200: { type: "array", items: Item } },
  },
  handler: getUsers,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get user by id",
    response: { 200: Item },
  },
  handler: getUserById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    // nincs security tehát -> publikus endpoint
    description: "Create a new user (registration)",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["name", "email", "password"],
    },
    response: {
      201: Item,
      409: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: addUser,
  // nincs onRequest: [fastify.authenticate]
};



const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update user",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: updateUserById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete user by id",
    response: {
      200: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: deleteUserById,
  onRequest: [fastify.authenticate],
};


  fastify.get("/users", getAll);
  fastify.get("/users/:id", getOne);
  fastify.post("/users", post);
  fastify.put("/users/:id", update);
  fastify.delete("/users/:id", del);

  done();
}

module.exports = UserRoutes;
