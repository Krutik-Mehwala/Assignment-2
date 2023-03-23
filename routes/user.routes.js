const express = require("express");
const app = express.Router();
const userController = require("../controller/user.controller");

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post("/add-user", userController.addUser);
app.get("/get-user/:id", userController.getUserByID);

module.exports = app;