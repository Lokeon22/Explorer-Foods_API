const knex = require("../database/knex");

class DishesController {
  async create(req, res) {
    const { name, price, category, ingre_name } = req.body;

    if (!name || !price || !category) {
      throw Error("Preencha todos os campos");
    }

    const [dish_id] = await knex("dishes").insert({
      // ao criar o prato me retorna o id dele
      name,
      price,
      category,
    });

    // pegando o array e inserindo o id do prato + cada item do array
    const ingredientsInsert = ingre_name.map((ingre) => {
      return {
        dish_id,
        ingre_name: ingre,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.json({ message: "Prato adicionado com sucesso" });
  }

  async show(req, res) {
    const { categoria } = req.params;

    const dishesCategory = await knex("dishes").where({ category: categoria });

    const ingredientes = await knex("ingredients");

    const allDishesWithIngre = dishesCategory.map((dishes) => {
      const allIngredientes = ingredientes.filter(
        (ingrediente) => ingrediente.dish_id === dishes.id
      );
      return {
        ...dishes,
        ingredientes: allIngredientes,
      };
    });

    return res.json(allDishesWithIngre);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, price, category, ingre_name } = req.body;

    const dish = await knex("dishes").where({ id }).first();

    await knex("dishes")
      .where({ id })
      .update({
        name: name ?? dish.name,
        price: price ?? dish.price,
        category: category ?? dish.category,
      });

    if (ingre_name && ingre_name.length > 0) {
      await knex("ingredients").where({ dish_id: id }).del();

      const allIngre = ingre_name.map((ingre) => {
        return {
          dish_id: dish.id,
          ingre_name: ingre,
        };
      });

      await knex("ingredients").where({ dish_id: id }).insert(allIngre);
    }

    return res.json({ message: "Prato atualizado" });
  }
}

module.exports = DishesController;
