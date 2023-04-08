const { Router } = require("express");

const userRoutes = require("./user.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", dishesRoutes);
routes.use("/", sessionsRoutes);

module.exports = routes;
