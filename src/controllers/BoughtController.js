const knex = require("../database/knex");

class BoughtController {
  async create(request, response) {
    const user_id = request.user.id;
    let itemsInCart;

    try {
      console.log("Fetching items from 'buy' table...");
      itemsInCart = await knex("buy")
        .where("user_id", user_id)
        .select("dishes_id")
        .count("* as quantity")
        .groupBy("dishes_id");

      const boughtItems = itemsInCart.map((item) => ({
        dishes_id: item.dishes_id,
        quantity: item.quantity,
      }));

      await knex("bought").insert({ user_id, items: JSON.stringify(boughtItems) });

      return response.status(200).json({ message: "Compra finalizada com sucesso" });
    } catch (error) {
      return response.status(500).json({ message: "Erro ao finalizar a compra" });
    }
  }

  async index(request, response) {
    const user_id = request.user.id;

    try {
      const boughtItems = await knex("bought")
        .select("bought.id", "bought.created_at", "bought.items", "bought.status", "users.name")
        .where("bought.user_id", user_id)
        .join("users", "bought.user_id", "users.id");

      const formattedItems = await Promise.all(
        boughtItems.map(async (boughtItem) => {
          const items = JSON.parse(boughtItem.items);

          const formattedItemNames = await Promise.all(
            items.map(async (item) => {
              const dish = await knex("dishes").where("id", item.dishes_id).first("name");
              return `${item.quantity}x ${dish.name}`;
            })
          );

          return {
            id: boughtItem.id,
            created_at: boughtItem.created_at,
            user_name: boughtItem.name,
            status: boughtItem.status,
            items: formattedItemNames.join(", "),
          };
        })
      );

      return response.status(200).json(formattedItems);
    } catch (error) {
      return response.status(500).json({ message: "Erro ao buscar os dados da tabela bought" });
    }
  }
}

module.exports = BoughtController;
