exports.up = function (knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.text("ingre_name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ingredients");
};
