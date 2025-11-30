// controllers/timeslots.js
const { knex } = require("../database");


// GET all timeslots
const getTimeslots = async (req, reply) => {
  try {
    const data = await knex("timeslot").select("*");
    reply.send(data);
  } catch (error) {
    reply.send(error);
  }
};

// GET timeslot by id
const getTimeslotById = async (req, reply) => {
  const { id } = req.params;

  try {
    const timeslot = await knex("timeslot").select("*").where({ timeslot_id: id });
    reply.send(timeslot[0]);
  } catch (error) {
    reply.send(error);
  }
};

// CREATE new timeslot
const addTimeslot = async (req, reply) => {
  const { room_id, start_time, end_time } = req.body;
  const created_at = new Date();

  try {
    const newTimeslot = await knex("timeslot")
      .insert({
        room_id,
        start_time,
        end_time,
        created_at,
      })
      .returning("*");

    reply.code(201).send(newTimeslot);
  } catch (error) {
    reply.send(error);
  }
};

// UPDATE timeslot
const updateTimeslotById = async (req, reply) => {
  const { id } = req.params;
  const { room_id, start_time, end_time } = req.body;

  try {
    await knex("timeslot")
      .where({ timeslot_id: id })
      .update({
        room_id,
        start_time,
        end_time,
      });

    reply.send({ message: "Timeslot updated successfully" });
  } catch (error) {
    reply.send(error);
  }
};

// DELETE timeslot
const deleteTimeslotById = async (req, reply) => {
  const { id } = req.params;

  try {
    await knex("timeslot").where({ timeslot_id: id }).del();
    reply.send({ message: `Timeslot ${id} deleted` });
  } catch (error) {
    reply.send(error);
  }
};

// GET available timeslots for a room
const getAvailableTimeslotsByRoom = async (req, reply) => {
  const { id } = req.params;

  try {
    // Lekérjük az adott szoba összes timeslotját, ami még nincs lefoglalva
    const timeslots = await knex("timeslot as t")
      .leftJoin("booking as b", "t.timeslot_id", "b.timeslot_id")
      .select("t.timeslot_id", "t.room_id", "t.start_time", "t.end_time")
      .where("t.room_id", id)
      .whereNull("b.timeslot_id") // nincs lefoglalva
      .orderBy("t.start_time", "asc");

    reply.send(timeslots);
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getTimeslots,
  getTimeslotById,
  addTimeslot,
  updateTimeslotById,
  deleteTimeslotById,
  getAvailableTimeslotsByRoom,
};
