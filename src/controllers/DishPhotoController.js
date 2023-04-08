const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishPhotoController {
  async update(req, res) {
    const { dish_id } = req.params;
    const photoFile = req.file.filename;

    const diskStorage = new DiskStorage();

    const [dishes] = await knex("dishes").where({ id: dish_id });

    if (!dishes) {
      throw Error("Prato não encontrado");
    }

    if (dishes.image) {
      await diskStorage.deleteFIle(dishes.image);
    }

    const filename = await diskStorage.saveFile(photoFile);

    await knex("dishes").where({ id: dish_id }).update({
      image: filename,
    });

    return res.json({ message: "Prato atualizado" });
  }
}

module.exports = DishPhotoController;
