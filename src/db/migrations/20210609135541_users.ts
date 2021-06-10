import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (t) => {
    t.string("id").primary().notNullable().unique();
    t.string("username", 15).notNullable().unique();
    t.string("email").notNullable().unique();
    t.string("password").notNullable();
    t.string("bio");
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
