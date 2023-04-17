require("express-async-errors");
require("dotenv/config");
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { UPLOADS_FOLDER } = require("./configs/upload");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
