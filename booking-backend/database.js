const DATABASE_NAME = process.env.DATABASE_NAME || "booking_system"
const DATABASE_USER = process.env.DATABASE_USER || "postgres"
const DATABASE_PASSWORD =process.env.DATABASE_PASSWORD || "postgres" 
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost"
const DATABASE_PORT = process.env.DATABASE_PORT || 5432

const knex = require("knex")({
  client: "pg",
  connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
  },
  pool: { min: 0, max: 7 },
})

module.exports = {knex:knex}