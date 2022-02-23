const user = require("../controllers/user.controllers");
const express = require('express');

function setUpUserRouter(app) {

    var userRouter = express.Router();
    userRouter.post("/createUser", user.create);
    userRouter.get("/login/:userName/:password", user.login);
    userRouter.put("/updateUser/:id", user.update);
    userRouter.get("/findAllUser", user.findUser);
    userRouter.delete("/deleteUserbyId/:id", user.deleteUserbyId);
    userRouter.delete("/deleteUser", user.deleteUser);
    app.use("/api/loginUser", userRouter);
};

module.exports = {
    setUpUserRouter: setUpUserRouter
}