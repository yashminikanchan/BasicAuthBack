const db = require("../models");
const Customer = db.customers;

// Create and Save a new Student
function createCustomer(req, res) {
    // Validate request
    if (!req.body.customerName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    console.log("-----", req.body);
    // Create a Student
    const customer = new Customer({
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerId:req.body.customerId,
        product: req.body.product,
        quantity: req.body.quantity,
    });
   
    // Save Student in the database
    customer.save(customer).then(data => {
       
        res.send(data);
   
    }).catch(err => {
       
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};
// Retrieve all Students from the database.
function findAllCustomers(req, res) {
    const customerName = req.query.customerName;
    var condition = customerName ? { customerName: { $regex: new RegExp(customerName), $options: "i" } } : {};

    Customer.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });
};
// Find a single Tutorial with an id
function findOneCustomer(req, res) {
    const id = req.params.id;

    Customer.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Customer with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Customer with id=" + id });
        });
};

// Update a Student by the id in the request
function updateCustomer(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Customer with id=${id}. Maybe customer was not found!`
                });
            } else res.send({ message: "Customer was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};
// Delete a Tutorial with the specified id in the request
function deleteCustomer(req, res) {
    const id = req.params.id;

    Customer.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Student was not found!`
                });
            } else {
                res.send({
                    message: "Customer deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all Students from the database.
function deleteAllCustomer(req, res) {
    Customer.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Customers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};


module.exports = {
    create: createCustomer,
    findAll: findAllCustomers,
    findOne: findOneCustomer,
    update: updateCustomer,
    deleteCustomer: deleteCustomer,
    deleteAll: deleteAllCustomer,
}