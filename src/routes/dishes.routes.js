const { Router } = require("express");

const multer = require("multer");
const { MULTER } = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishPhotoController = require("../controllers/DishPhotoController");
const upload = multer(MULTER);

const ensureAuth = require("../middleware");

const dishesRoutes = Router();

const dishesController = new DishesController();
const dishphotoController = new DishPhotoController();

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
dishesRoutes.patch(
  "/dishphoto/:dish_id",
  ensureAuth,
  upload.single("image"),
  dishphotoController.update
);

module.exports = dishesRoutes;
