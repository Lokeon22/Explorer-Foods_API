const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.post("/dish", dishesController.create);
dishesRoutes.get("/dishes/:categoria", dishesController.show);
dishesRoutes.put("/editdish/:id", dishesController.update);

module.exports = dishesRoutes;
