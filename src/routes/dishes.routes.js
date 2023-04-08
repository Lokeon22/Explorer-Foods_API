const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.post("/createdish", dishesController.create);
dishesRoutes.get("/dishes/:categoria", dishesController.show);
dishesRoutes.get("/alldishes", dishesController.index);
dishesRoutes.put("/editdish/:id", dishesController.update);
dishesRoutes.delete("/remove/:id", dishesController.delete);

module.exports = dishesRoutes;
