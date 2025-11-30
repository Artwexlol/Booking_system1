const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Törlés helyes sorrendben (függőségek miatt)
  await knex("booking_log").del();
  await knex("user_role").del();
  await knex("role_permission").del();
  await knex("booking").del();
  await knex("timeslot").del();
  await knex("room").del();
  await knex("user").del();
  await knex("role").del();
  await knex("permission").del();

  const userPass = await bcrypt.hash("user", 10);
  const adminPass = await bcrypt.hash("admin", 10);

  // Users
  await knex("user").insert([
    {
      name: "User",
      email: "user@example.com",
      password: userPass,
      created_at: new Date(),
    },
    {
      name: "Admin",
      email: "admin@example.com",
      password: adminPass,
      created_at: new Date(),
    },
  ]);

  // Rooms
  await knex("room").insert([
    { 
        name: "Konferencia terem A", 
        capacity: 10, 
        created_at: new Date() 
    },
    { 
        name: "Tárgyaló B", 
        capacity: 6, 
        created_at: new Date() 
    },
  ]);

  // Timeslots
  await knex("timeslot").insert([
    {
      room_id: 1,
      start_time: "2025-09-12 10:00:00",
      end_time: "2025-09-12 11:00:00",
      created_at: new Date(),
    },
    {
      room_id: 2,
      start_time: "2025-09-12 11:00:00",
      end_time: "2025-09-12 12:00:00",
      created_at: new Date(),
    },
  ]);

  // Bookings
  await knex("booking").insert([
    { 
        user_id: 1, 
        timeslot_id: 1, 
        status: "booked", 
        created_at: new Date() 
    },
  ]);

  // Permissions
  await knex("permission").insert([
    {
      permission_name: "CREATE_BOOKING",
      permission_desc: "Can create bookings",
      created_at: new Date(),
    },
    {
      permission_name: "CANCEL_BOOKING",
      permission_desc: "Can cancel bookings",
      created_at: new Date(),
    },
  ]);

  // Roles
  await knex("role").insert([
    {
      role_name: "admin",
      role_desc: "System administrator",
      created_at: new Date(),
    },
    {
      role_name: "user",
      role_desc: "Regular user",
      created_at: new Date(),
    },
  ]);

  // Role-Permissions
  await knex("role_permission").insert([
    { 
        role_id: 1, 
        permission_id: 1, 
        created_at: new Date() 
    },
    { 
        role_id: 1, 
        permission_id: 2, 
        created_at: new Date() 
    },
  ]);

  // User-Roles
  await knex("user_role").insert([
    { 
        user_id: 1, 
        role_id: 1, 
        created_at: new Date() 
    },
    { 
        user_id: 2, 
        role_id: 2, 
        created_at: new Date() 
    },
  ]);
};