const { Router } = require("express");

const userRoutes = require("./user.routes");
const dishesRoutes = require("./dishes.routes");

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", dishesRoutes);

module.exports = routes;
