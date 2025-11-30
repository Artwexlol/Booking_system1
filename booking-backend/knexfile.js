const dbConfig = {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "booking_system",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
  };
  
  module.exports = {
    development: dbConfig,
    staging: dbConfig,
    production: dbConfig,
  };