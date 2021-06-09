// Update with your config settings.

const config = {
  development: {
    client: "pg",
    connection: "postgresql://postgres:postgres@localhost:7777/recetas",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    connection: "postgresql://postgres:postgres@localhost:7777/recetas",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default config;
