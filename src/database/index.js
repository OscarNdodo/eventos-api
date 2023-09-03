const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("../models/User");
const Event = require("../models/Event");
// const Ticket = require("../models/Ticket");

const connection = new Sequelize(dbConfig);

User.init(connection);
Event.init(connection);
// Ticket.init(connection);

User.associate(connection.models);
Event.associate(connection.models);
// Ticket.associate(connection.models);

connection.authenticate()
	.then(() => console.log("DB: connected...!"))
	.catch((error) => console.log("DB: ERROR = " + error))


module.exports = connection;