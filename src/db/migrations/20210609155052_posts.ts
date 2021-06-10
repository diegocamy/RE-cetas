import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (t) => {
    t.string("id").primary().notNullable().unique();
    t.string("author")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE")
      .index();
    t.string("title").notNullable();
    t.integer("likes").defaultTo(0);
    t.string("slug").notNullable().unique();
    t.text("content").notNullable();
    t.string("image").notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}
