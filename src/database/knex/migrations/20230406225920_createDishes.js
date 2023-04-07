exports.up = function (knex) {
  return knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("name");
    table.text("price");
    table.text("image").defaultTo(null);
    table.text("category");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("dishes");
};
