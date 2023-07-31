const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const { dishes_id } = request.body;
    const user_id = request.user.id;

    const existingFavorite = await knex("favorites").where({ user_id, dishes_id }).first();

    if (existingFavorite) {
      return response.status(400).json({ message: "Prato já adcionado aos favoritos" });
    }

    await knex("favorites").insert({
      user_id,
      dishes_id,
    });

    return response.json();
  }

  async delete(request, response) {
    const { dishes_id } = request.params;
    const user_id = request.user.id;

    await knex("favorites").where({ user_id, dishes_id }).delete();

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("favorites")
      .where("favorites.user_id", user_id)
      .join("dishes", "favorites.dishes_id", "dishes.id")
      .select("dishes.name", "dishes.image", "dishes.id")
      .orderBy("dishes.name", "asc");

    return response.json(favorites);
  }
}

module.exports = FavoritesController;
