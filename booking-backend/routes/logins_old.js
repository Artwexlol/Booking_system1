const { login, logout, checkAuth } = require("../controllers/logins");

function AuthRoutes(fastify, options, done) {
  fastify.post("/auth/login", {
    handler: login,
    schema: {
      description: "User login",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" }
        },
        required: ["email", "password"]
      }
    }
  });

  fastify.post("/auth/logout", { handler: logout });

  fastify.post("/checkauth", {
    onRequest: [fastify.authenticate],
    handler: checkAuth,
  });

  done();
}

module.exports = AuthRoutes;
