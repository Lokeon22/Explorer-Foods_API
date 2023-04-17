require("dotenv").config();
const { hash } = require("bcrypt");
const tableName = "users";

exports.up = async function (knex) {
  const exists = await knex.schema.hasTable(tableName);
  const adminPass = await hash(process.env.ADMIN_PASS, 8);
  if (!exists) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("is_admin").notNullable().defaultTo(0);
    });

    return await knex(tableName).insert({
      id: "1",
      name: "admin",
      email: process.env.ADMIN_EMAIL,
      password: adminPass,
      is_admin: true,
    });
  }
};

exports.down = async function (knex) {
  return await knex.schema.dropTable(tableName);
};
