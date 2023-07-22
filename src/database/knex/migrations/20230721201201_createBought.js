exports.up = (knex) =>
  knex.schema.createTable("bought", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("bought");
