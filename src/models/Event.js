const { Model, DataTypes } = require("sequelize");

class Event extends Model {
	static init(sequelize) {
		try {

			super.init({
				title: DataTypes.STRING,
				description: DataTypes.STRING,
				image: DataTypes.STRING,
				tickets: DataTypes.INTEGER,
				date: DataTypes.DATE,
				location: DataTypes.STRING,
				time: DataTypes.TIME,
				contact: DataTypes.STRING,
				contact_alt: DataTypes.STRING,
				status: DataTypes.BOOLEAN
			}, { sequelize, tableName: "events" });
		} catch (error) {
			return error
		}
	};

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
	}
}

module.exports = Event;