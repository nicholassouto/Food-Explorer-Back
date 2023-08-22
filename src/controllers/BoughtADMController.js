const knex = require("../database/knex");

class BoughtADMController {
  async index(request, response) {
    try {
      const boughtItems = await knex("bought")
        .select("bought.id", "bought.created_at", "bought.items", "bought.status", "users.name")
        .join("users", "bought.user_id", "users.id")
        .orderBy("bought.created_at", "desc");

      const formattedItems = await Promise.all(
        boughtItems.map(async (boughtItem) => {
          const items = JSON.parse(boughtItem.items);

          const formattedItemNames = items.map((item) => `${item.quantity}x ${item.name}`);

          return {
            id: boughtItem.id,
            created_at: boughtItem.created_at,
            user_name: boughtItem.name,
            status: boughtItem.status,
            items: formattedItemNames.join(", "),
          };
        })
      );

      return response.json(formattedItems);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar pedidos" });
    }
  }

  async updateStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    try {
      await knex("bought").where("id", id).update({ status });
      return response.status(200).json({ message: "Status atualizado com sucesso" });
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar o status do pedido" });
    }
  }
}

module.exports = BoughtADMController;
