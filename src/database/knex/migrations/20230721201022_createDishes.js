exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.decimal("price", 10, 2);
    table.text("category");
    table.text("image").nullable();
    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
