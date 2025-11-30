// routes/bookingRoutes.js

const {
  getBookings,
  getBookingById,
  addBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingsByUser,
  getBookingsByRoom,
  cancelBooking,
} = require("../controllers/bookings");

const Item = {
  type: "object",
  properties: {
    booking_id: { type: "integer" },
    user_id: { type: "integer" },
    timeslot_id: { type: "integer" },
    status: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
};

function BookingRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all bookings",
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getBookings,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get booking by id",
    response: {
      200: Item,
    },
  },
  handler: getBookingById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    body: {
      type: "object",
      required: ["timeslot_id"],
      properties: {
        timeslot_id: { type: "integer" },
        status: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        additionalProperties: true,
      },
    },
  },
  handler: addBooking,
  onRequest: [fastify.authenticate],
};


const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update booking status",
    body: {
      type: "object",
      properties: {
        status: { type: "string" },
      },
      required: ["status"],
    },
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: updateBookingStatus,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete booking by id",
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: deleteBooking,
  onRequest: [fastify.authenticate],
};

const userBookings = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all bookings for a specific user",
  },
  handler: getBookingsByUser,
  onRequest: [fastify.authenticate],
};

const roomBookings = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all bookings for a specific room",
  },
  handler: getBookingsByRoom,
  onRequest: [fastify.authenticate],
};

const cancel = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Cancel a booking (quick endpoint)",
    response: {
      200: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  handler: cancelBooking,
  onRequest: [fastify.authenticate],
};


  fastify.get("/bookings", getAll);
  fastify.get("/bookings/:id", getOne);
  fastify.post("/bookings", post);
  fastify.put("/bookings/:id", update);
  fastify.delete("/bookings/:id", del);

  // Extra endpoints
  fastify.get("/users/:id/bookings", userBookings);
  fastify.get("/rooms/:id/bookings", roomBookings);
  fastify.post("/bookings/:id/cancel", cancel);

  done();
}

module.exports = BookingRoutes;
