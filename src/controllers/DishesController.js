const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, price, category, tags } = request.body;
    const { user_id } = request.params;

    const [dishes_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
      user_id,
    });

    const ingredientsInsert = ingredients.map((tags) => {
      return {
        dishes_id,
        tags,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }
}

module.exports = DishesController;
