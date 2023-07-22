const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password, admin } = request.body;

    const existingUser = await knex("users").whereRaw("LOWER(email) = ?", email.toLowerCase()).first();

    if (existingUser) {
      throw new AppError("Este e-mail já está em uso");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      admin,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where("id", id).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await knex("users").where("email", email).first();

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha não confere");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where("id", id).update({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return response.json();
  }
}

module.exports = UsersController;
