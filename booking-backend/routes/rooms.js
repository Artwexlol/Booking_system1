// routes/roomRoutes.js
const {
  getRooms,
  getRoomById,
  addRoom,
  updateRoomById,
  deleteRoomById,
  getTimeslotsByRoom,
} = require("../controllers/rooms");

const Item = {
  type: "object",
  properties: {
    room_id: { type: "integer" },
    name: { type: "string" },
    capacity: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
  },
};

function RoomRoutes(fastify, options, done) {
const getAll = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all rooms",
    response: { 200: { type: "array", items: Item } },
  },
  handler: getRooms,
  onRequest: [fastify.authenticate],
};

const getOne = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get room by id",
    response: { 200: Item },
  },
  handler: getRoomById,
  onRequest: [fastify.authenticate],
};

const post = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Create a new room",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        capacity: { type: "integer" },
      },
      required: ["name", "capacity"],
    },
    response: { 201: { type: "array", items: Item } },
  },
  handler: addRoom,
  onRequest: [fastify.authenticate],
};

const update = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Update a room",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        capacity: { type: "integer" },
      },
      required: ["name", "capacity"],
    },
    response: { 200: { type: "object", properties: { message: { type: "string" } } } },
  },
  handler: updateRoomById,
  onRequest: [fastify.authenticate],
};

const del = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Delete a room",
    response: { 200: { type: "object", properties: { message: { type: "string" } } } },
  },
  handler: deleteRoomById,
  onRequest: [fastify.authenticate],
};

const timeslots = {
  schema: {
    security: [{ Bearer: [] }],
    description: "Get all timeslots for a specific room",
    response: { 200: { type: "array", items: { type: "object" } } },
  },
  handler: getTimeslotsByRoom,
  onRequest: [fastify.authenticate],
};


  fastify.get("/rooms", getAll);
  fastify.get("/rooms/:id", getOne);
  fastify.post("/rooms", post);
  fastify.put("/rooms/:id", update);
  fastify.delete("/rooms/:id", del);

  // Extra: timeslots egy adott szobához
  fastify.get("/rooms/:id/timeslots", timeslots);

  done();
}

module.exports = RoomRoutes;
