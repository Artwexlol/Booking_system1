// controllers/bookingLogs.js
const { knex } = require("../database");


// GET all booking logs
const getBookingLogs = async (req, reply) => {
  try {
    const logs = await knex("booking_log").select("*");
    reply.send(logs);
  } catch (error) {
    reply.send(error);
  }
};

// GET one booking log by id
const getBookingLogById = async (req, reply) => {
  const { id } = req.params;

  try {
    const log = await knex("booking_log")
      .select("*")
      .where({ id });

    reply.send(log[0]);
  } catch (error) {
    reply.send(error);
  }
};

module.exports = {
  getBookingLogs,
  getBookingLogById,
};
