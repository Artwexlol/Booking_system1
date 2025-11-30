const fastify = require("fastify")({ logger: true });
const { knex } = require("./database");

// CORS
fastify.register(require("@fastify/cors"), {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

// JWT
fastify.register(require("@fastify/jwt"), {
  secret: process.env.IDOPONTFOGLALO_JWT_SECRETKEY || "secretKeyForBookingSystem213edaefw",
});

// Middleware: authenticate()
fastify.decorate("authenticate", async function (request, reply) {
  console.log("AUTH HEADER:", request.headers.authorization);

  try {
    await request.jwtVerify();
  } catch (err) {
    console.log("JWT VERIFY ERROR:", err);
    reply.code(401).send({ message: "Unauthorized" });
  }
});


// Swagger
fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: { title: "Booking API", version: "1.0.0" },
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Enter 'Bearer <token>'",
      },
    },
    security: [{ Bearer: [] }],
  },
  exposeRoute: true,
});


// Swagger UI
fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
});

// ROUTES
fastify.register(require("./routes/permissions"));
fastify.register(require("./routes/users"));
fastify.register(require("./routes/roles"));
fastify.register(require("./routes/role_permissions"));
fastify.register(require("./routes/user_roles"));
fastify.register(require("./routes/booking_logs"));
fastify.register(require("./routes/bookings"));
fastify.register(require("./routes/timeslots"));
fastify.register(require("./routes/rooms"));
fastify.register(require("./routes/logins"));

// START SERVER
const start = async () => {
  // Wait for PGSQL
  for (;;) {
    try {
      await knex.raw("select 1+1");
      break;
    } catch (err) {
      console.log("Unable to connect to PGSQL, waiting...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Run migrations
  const path = require("path");
  await knex.migrate.latest({ directory: path.join(__dirname, "dbmigrations") });

  fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
};

start();

module.exports = { fastify, knex };
