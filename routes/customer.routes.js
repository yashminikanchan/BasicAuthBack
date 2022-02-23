const customers = require("../controllers/customer.controllers");
const express = require('express');

function setUpCustomerRouter(app) {

    var customerRouter = express.Router();
    customerRouter.post("/createcustomer", customers.create);
    customerRouter.get("/findall", customers.findAll);
    customerRouter.get("/findall/:id", customers.findOne);
    customerRouter.put("/updateCustomer/:id", customers.update);
    customerRouter.delete("/deleteCustomer/:id", customers.deleteCustomer);
    customerRouter.delete("/deleteall", customers.deleteAll);
    app.use("/api/customers", customerRouter);
};

module.exports = {
    setUpCustomerRouter: setUpCustomerRouter
}