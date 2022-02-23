const { user } = require("../models");
const db = require("../models");
const User = db.user;

function getUser(req, res) {
    let userName = req.params.userName;
    let password = req.params.password;
    //logic to data from server     OR
    //logic to fetch data from server and match username & password
    res.send({
        "userName": userName,
        "password": password
    });
}

function createUser(req, res) {
    // Validate request
    // if (!req.body.userName) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }
    console.log("-----", req.body);
    // Create a Student
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    });

    // Save Student in the database
    user.save(user).then(data => {

        res.send(data);

    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

//Update a Student by the id in the request
function updateUser(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }


    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User. Maybe user was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error updating User."
            });
        });
}

// Retrieve all Students from the database.
function findAllUser(req, res) {
    const userName = req.query.userName;
    var condition = userName ? { userName: { $regex: new RegExp(userName), $options: "i" } } : {};

    User.find(condition)
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

function deleteUserbyId(req, res) {
    const id = req.params.id;

    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe Student was not found!`
                });
            } else {
                res.send({
                    message: "User deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};


function deleteUser(req, res) {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing the User."
            });
        });


};


module.exports = {
    create: createUser,
    update: updateUser,
    findUser:findAllUser,
    login: getUser,
    deleteUser: deleteUser,
    deleteUserbyId: deleteUserbyId
}