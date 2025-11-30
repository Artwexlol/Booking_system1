// routes/logins.js
const { login, logout, checkAuth, register } = require("../controllers/logins");

function AuthRoutes(fastify, options, done) {
  fastify.post("/auth/login", {
    handler: login,
    schema: {
      description: "User login",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
    },
  });

  // ÚJ: REGISZTRÁCIÓ
  fastify.post("/auth/register", {
    handler: register,
    schema: {
      description: "User registration",
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
        201: {
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                user_id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" },
              },
            },
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
  });

  fastify.post("/auth/logout", { handler: logout });

  fastify.post("/checkauth", {
    onRequest: [fastify.authenticate],
    handler: checkAuth,
  });

  done();
}

module.exports = AuthRoutes;
