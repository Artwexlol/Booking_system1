// routes/timeslotRoutes.js
const {
  getTimeslots,
  getTimeslotById,
  addTimeslot,
  updateTimeslotById,
  deleteTimeslotById,
  getAvailableTimeslotsByRoom,
} = require("../controllers/timeslots");

const Item = {
  type: "object",
  properties: {
    timeslot_id: { type: "integer" },
    room_id: { type: "integer" },
    start_time: { type: "string", format: "date-time" },
    end_time: { type: "string", format: "date-time" },
    created_at: { type: "string", format: "date-time" },
  },
};

function TimeslotRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all timeslots",
    response: {
      200: { type: "array", items: Item },
    },
  },
  handler: getTimeslots,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get timeslot by id",
    response: { 200: Item },
  },
  handler: getTimeslotById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Create a new timeslot",
    body: {
      type: "object",
      properties: {
        room_id: { type: "integer" },
        start_time: { type: "string", format: "date-time" },
        end_time: { type: "string", format: "date-time" },
      },
      required: ["room_id", "start_time", "end_time"],
    },
    response: { 201: { type: "array", items: Item } },
  },
  handler: addTimeslot,
  onRequest: [fastify.authenticate],
};

const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update a timeslot",
    body: {
      type: "object",
      properties: {
        room_id: { type: "integer" },
        start_time: { type: "string", format: "date-time" },
        end_time: { type: "string", format: "date-time" },
      },
      required: ["room_id", "start_time", "end_time"],
    },
    response: {
      200: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: updateTimeslotById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete a timeslot",
    response: {
      200: { type: "object", properties: { message: { type: "string" } } },
    },
  },
  handler: deleteTimeslotById,
  onRequest: [fastify.authenticate],
};

const availableTimeslots = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get available timeslots for a room",
    response: {
      200: { type: "array", items: Item },
    },
  },
  handler: getAvailableTimeslotsByRoom,
  onRequest: [fastify.authenticate],
};


  fastify.get("/timeslots", getAll);
  fastify.get("/timeslots/:id", getOne);
  fastify.post("/timeslots", post);
  fastify.put("/timeslots/:id", update);
  fastify.delete("/timeslots/:id", del);

  // Extra: szabad időpontok egy adott szobához
  fastify.get("/rooms/:id/available-timeslots", availableTimeslots);

  done();
}

module.exports = TimeslotRoutes;
