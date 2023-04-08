const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const ensureAuth = require("../middleware");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.post("/createdish", ensureAuth, dishesController.create);
dishesRoutes.get("/dishes/:categoria", dishesController.show);
dishesRoutes.get("/dish/:id", dishesController.index);
dishesRoutes.put("/editdish/:dish_id", ensureAuth, dishesController.update);
dishesRoutes.delete("/remove/:dish_id", ensureAuth, dishesController.delete);

module.exports = dishesRoutes;
