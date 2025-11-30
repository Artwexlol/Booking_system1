

/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function (knex) {
  // user
  await knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("password", 100).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // room
  await knex.schema.createTable("room", (table) => {
    table.increments("room_id").primary();
    table.string("name", 100).notNullable();
    table.integer("capacity").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // timeslot
  await knex.schema.createTable("timeslot", (table) => {
    table.increments("timeslot_id").primary();
    table
      .integer("room_id")
      .unsigned()
      .notNullable()
      .references("room_id")
      .inTable("room")
      .onDelete("CASCADE");
    table.dateTime("start_time").notNullable();
    table.dateTime("end_time").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // booking
  await knex.schema.createTable("booking", (table) => {
    table.increments("booking_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("timeslot_id")
      .unsigned()
      .notNullable()
      .unique()
      .references("timeslot_id")
      .inTable("timeslot")
      .onDelete("CASCADE");
    table.string("status", 20).notNullable().defaultTo("booked");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // permission
  await knex.schema.createTable("permission", (table) => {
    table.increments("permission_id").primary();
    table.string("permission_name").notNullable();
    table.string("permission_desc");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // role
  await knex.schema.createTable("role", (table) => {
    table.increments("role_id").primary();
    table.string("role_name").notNullable();
    table.string("role_desc");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // role_permission
  await knex.schema.createTable("role_permission", (table) => {
    table.increments("role_permission_id").primary();
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("role_id")
      .inTable("role")
      .onDelete("CASCADE");
    table
      .integer("permission_id")
      .unsigned()
      .notNullable()
      .references("permission_id")
      .inTable("permission")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // user_role
  await knex.schema.createTable("user_role", (table) => {
    table.increments("user_role_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("role_id")
      .inTable("role")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  // booking_log
  await knex.schema.createTable("booking_log", (table) => {
    table.increments("id").primary();
    table
      .integer("booking_id")
      .unsigned()
      .notNullable()
      .references("booking_id")
      .inTable("booking")
      .onDelete("CASCADE");
    table.string("operation", 20).notNullable();
    table
      .integer("created_by")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onDelete("SET NULL");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("booking_log");
  await knex.schema.dropTableIfExists("user_role");
  await knex.schema.dropTableIfExists("role_permission");
  await knex.schema.dropTableIfExists("role");
  await knex.schema.dropTableIfExists("permission");
  await knex.schema.dropTableIfExists("booking");
  await knex.schema.dropTableIfExists("timeslot");
  await knex.schema.dropTableIfExists("room");
  await knex.schema.dropTableIfExists("user");
};
