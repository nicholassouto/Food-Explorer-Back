const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const user_id = request.user.id;

    const parsedPrice = parseFloat(price.replace(",", "."));

    const [dishes_id] = await knex("dishes").insert({
      name,
      description,
      price: parsedPrice,
      category,
      user_id,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dishes_id,
        tags: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dishes = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dishes_id: id }).orderBy("tags");

    return response.json({
      ...dishes,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { category } = request.query;
    const dishes = await knex("dishes").where({ category }).orderBy("name");

    return response.json(dishes);
  }
}

module.exports = DishesController;
