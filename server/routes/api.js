const express = require("express");
const apiRouters = express.Router();

// apiRouters.use("/auth", require("./auth"));
apiRouters.use("/notes", require("./notes"));

module.exports = apiRouters;
