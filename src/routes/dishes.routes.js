const { Router } = require("express");

const multer = require("multer");
const { MULTER } = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const upload = multer(MULTER);

const ensureAuth = require("../middleware");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.patch(
  "/createdish",
  ensureAuth,
  upload.single("image"),
  dishesController.create
);
dishesRoutes.get("/dishes/:categoria", dishesController.show);
dishesRoutes.get("/dish/:id", dishesController.index);
dishesRoutes.put("/editdish/:dish_id", ensureAuth, dishesController.update);
dishesRoutes.delete("/remove/:dish_id", ensureAuth, dishesController.delete);

module.exports = dishesRoutes;
