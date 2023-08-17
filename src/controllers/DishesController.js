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
    const { category, search } = request.query;
    let query = knex("dishes").where({ category });

    if (search) {
      query = query.where((builder) => {
        return builder
          .where("name", "LIKE", `%${search}%`)
          .orWhereIn(
            "id",
            knex("dishes")
              .leftJoin("ingredients", "dishes.id", "ingredients.dishes_id")
              .select("dishes.id")
              .where("ingredients.tags", "LIKE", `%${search}%`)
          );
      });
    }

    query = query.orderBy("name");

    const dishes = await query;

    return response.json(dishes);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, category, ingredients } = request.body;

    const formattedPrice = parseFloat(price.replace(",", "."));

    await knex("dishes").where({ id }).update({ name, description, price: formattedPrice, category });

    await knex("ingredients").where({ dishes_id: id }).delete();

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dishes_id: id,
        tags: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }
}

module.exports = DishesController;
