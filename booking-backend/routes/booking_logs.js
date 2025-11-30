// routes/bookingLogRoutes.js

const {
  getBookingLogs,
  getBookingLogById,
} = require("../controllers/booking_logs");

const Item = {
  type: "object",
  properties: {
    id: { type: "integer" },
    booking_id: { type: "integer" },
    operation: { type: "string" },
    created_by: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
  },
};

function BookingLogRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all booking logs",
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getBookingLogs,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get booking log by id",
    response: {
      200: Item,
    },
  },
  handler: getBookingLogById,
  onRequest: [fastify.authenticate],
};


  fastify.get("/booking-logs", getAll); // GET all logs
  fastify.get("/booking-logs/:id", getOne); // GET log by id
  done();
}

module.exports = BookingLogRoutes;
