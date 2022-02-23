const dbConfig = require("../config/db.config");


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.customers = require("../models/customer.models")(mongoose);
db.user = require("../models/user.models")(mongoose);
module.exports = db;