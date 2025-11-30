// controllers/rooms.js
const { knex } = require("../database");


// GET all rooms
const getRooms = async (req, reply) => {
  try {
    const data = await knex("room").select("*");
    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

// GET room by id
const getRoomById = async (req, reply) => {
  const { id } = req.params;
  try {
    const room = await knex("room").select("*").where({ room_id: id });
    reply.send(room[0]);
  } catch (error) {
    reply.send(error);
  }
};

// CREATE new room
const addRoom = async (req, reply) => {
  const { name, capacity } = req.body;
  const created_at = new Date();

  try {
    const newRoom = await knex("room")
      .insert({ name, capacity, created_at })
      .returning("*");

    reply.code(201).send(newRoom);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE room
const updateRoomById = async (req, reply) => {
  const { id } = req.params;
  const { name, capacity } = req.body;

  try {
    await knex("room")
      .where({ room_id: id })
      .update({ name, capacity });

    reply.send({ message: "Room updated successfully" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE room
const deleteRoomById = async (req, reply) => {
  const { id } = req.params;

  try {
    await knex("room").where({ room_id: id }).del();
    reply.send({ message: `Room ${id} deleted` });
  } catch (error) {
    reply.send(error);
  }
};

// GET all timeslots for a room
const getTimeslotsByRoom = async (req, reply) => {
  const { id } = req.params;

  try {
    const timeslots = await knex("timeslot")
      .select("*")
      .where({ room_id: id })
      .orderBy("start_time", "asc");

    reply.send(timeslots);
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getRooms,
  getRoomById,
  addRoom,
  updateRoomById,
  deleteRoomById,
  getTimeslotsByRoom,
};
