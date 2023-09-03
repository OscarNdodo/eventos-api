require("dotenv").config();

module.exports = {
	dialect: process.env.DIALECT,
	host: process.env.HOST,
	username: "devndodo" || process.env.USER,
	password: process.env.PASS,
	database: process.env.DB,
	define: {
		timestemp: true,
		underscored: true
	}
}