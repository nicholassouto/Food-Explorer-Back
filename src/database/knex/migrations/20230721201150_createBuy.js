exports.up = (knex) =>
  knex.schema.createTable("buy", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("dishes_id").references("id").inTable("dishes").onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("buy");
