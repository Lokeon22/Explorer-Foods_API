const { hash } = require("bcrypt");
const knex = require("../database/knex");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw AppError("Preencha todos os campos");
    }

    const user = await knex("users").where({ email }).first();

    if (user) {
      throw Error("Esse email já existe");
    }

    const hashPass = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashPass });

    return res.json({ message: "Usuario cadastrado" });
  }

  async show(req, res) {
    const { id } = req.params;
    const [user] = await knex("users").where({ id });

    return res.json(user);
  }
}

module.exports = UserController;
