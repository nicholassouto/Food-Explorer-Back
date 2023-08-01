const knex = require("../database/knex");

class BuyController {
  async create(request, response) {
    const { dishes_id } = request.body;
    const user_id = request.user.id;

    await knex("buy").insert({
      user_id,
      dishes_id,
    });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    await knex("buy").where({ user_id, id }).delete();

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("buy")
      .where("buy.user_id", user_id)
      .join("dishes", "buy.dishes_id", "dishes.id")
      .select("buy.id", "dishes.name", "dishes.image", "dishes.price")
      .orderBy("dishes.name", "asc");

    return response.json(favorites);
  }
}

module.exports = BuyController;
