const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../PROVIDERS/DiskStorage");

class DishesImageController {
  async update(request, response) {
    const dishes_id = request.params.id;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dishes = await knex("dishes").where({ id: dishes_id }).first();

    if (!dishes) {
      throw new AppError("Prato nao existente", 401);
    }

    if (dishes.image) {
      await diskStorage.deleteFile(dishes.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);

    dishes.image = filename;

    await knex("dishes").update(dishes).where({ id: dishes_id });

    return response.json(dishes);
  }

  async createWithImage(request, response) {
    try {
      const { name, description, price, category, ingredients } = JSON.parse(request.body.data);
      const user_id = request.user.id;
      const imageFile = request.file; // A imagem vinda da requisição

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

      if (imageFile) {
        const diskStorage = new DiskStorage();
        const imageFilename = `dish_${dishes_id}.jpg`;
        const savedImageFilename = await diskStorage.saveFile(imageFile.filename);
        await knex("dishes").update({ image: savedImageFilename }).where({ id: dishes_id });
      }

      return response.json({ dishes_id });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao criar o prato" });
    }
  }
}
module.exports = DishesImageController;
