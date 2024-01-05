const express = require("express");
const authRouter = express.Router();
const {login, signup} = require('../controller/auth')

authRouter.use("/login", login);
authRouter.use("/signup", signup);



module.exports = authRouter;
