const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(req, res) {
    const { name, price, description, category, ingre_name } = req.body;

    let ingre_nameConvert = JSON.parse(ingre_name);

    const image = req.file.filename;
    const id = req.user.id;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id }).first();

    if (user.is_admin === 0) {
      //only admin post
      throw Error("Usuario sem permissão");
    }

    if (!name || !description || !price || !category || !image) {
      throw Error("Preencha todos os campos");
    }

    const filename = await diskStorage.saveFile(image);

    const [dish_id] = await knex("dishes").insert({
      // ao criar o prato me retorna o id dele
      name,
      description,
      price,
      image: filename,
      category,
    });

    // pegando o array e inserindo o id do prato + cada item do array
    const ingredientsInsert = ingre_nameConvert.map((ingre) => {
      return {
        dish_id,
        ingre_name: ingre,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.json({ message: "Prato adicionado" });
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

  async index(req, res) {
    const { id } = req.params;

    const allDishes = await knex("dishes").where({ id });

    const ingredients = await knex("ingredients");

    const [allDisheWithIngre] = allDishes.map((dish) => {
      const allIngre = ingredients.filter((ingre) => ingre.dish_id === dish.id);
      return {
        ...dish,
        allIngre,
      };
    });

    return res.json(allDisheWithIngre);
  }

  async search(req, res) {
    const allDishes = await knex("dishes");
    const ingredients = await knex("ingredients");

    const allDisheWithIngre = allDishes.map((dish) => {
      const allIngre = ingredients.filter((ingre) => ingre.dish_id === dish.id);
      return {
        ...dish,
        allIngre,
      };
    });

    return res.json(allDisheWithIngre);
  }

  async update(req, res) {
    const { dish_id } = req.params;
    const { name, price, description, category, ingre_name } = req.body;
    const id = req.user.id;

    const dish = await knex("dishes").where({ id: dish_id }).first();

    const user = await knex("users").where({ id }).first();

    if (user.is_admin === 0) {
      throw Error("Usuario sem permissão");
    }

    await knex("dishes")
      .where({ id: dish_id })
      .update({
        name: name ?? dish.name,
        description: description ?? dish.description,
        price: price ?? dish.price,
        category: category ?? dish.category,
      });

    if (ingre_name && ingre_name.length > 0) {
      await knex("ingredients").where({ dish_id }).del();

      const allIngre = ingre_name.map((ingre) => {
        return {
          dish_id: dish.id,
          ingre_name: ingre,
        };
      });

      await knex("ingredients").where({ dish_id }).insert(allIngre);
    }

    return res.json({ message: "Prato atualizado" });
  }

  async delete(req, res) {
    const { dish_id } = req.params;
    const id = req.user.id;

    const diskStorage = new DiskStorage();

    const [user] = await knex("users").where({ id });

    const [dishes] = await knex("dishes").where({ id: dish_id });

    if (user.is_admin === 0) {
      throw Error("Usuario sem permissão");
    }

    await diskStorage.deleteFIle(dishes.image);

    await knex("dishes").where({ id: dish_id }).del();

    return res.json(user);
  }
}

module.exports = DishesController;
