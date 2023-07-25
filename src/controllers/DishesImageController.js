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
}
module.exports = DishesImageController;
