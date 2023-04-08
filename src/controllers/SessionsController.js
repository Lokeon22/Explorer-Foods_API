const knex = require("../database/knex");
const { compare } = require("bcrypt");

const authConfigs = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("Preencha todos os campos");
    }

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw Error("Email e/ou senha incorretas");
    }

    const verifyPass = await compare(password, user.password);

    if (!verifyPass) {
      throw Error("Email e/ou senha incorretas");
    }

    const { secret, expiresIn } = authConfigs.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsController;
