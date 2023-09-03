const { Model, DataTypes } = require("sequelize");

class Ticket extends Model {
	static init(sequelize) {
		try {

			super.init({
				// id: {
				// 	type: DataTypes.UUID,
				// 	defaultValue: DataTypes.UUIDV4
				// },
				// event_id: DataTypes.UUID,
				name: DataTypes.STRING,
				code: DataTypes.STRING,
				price: DataTypes.FLOAT,
				validate: DataTypes.DATE,
				location: DataTypes.STRING,
				date: DataTypes.DATE
			}, { sequelize, tableName: "tickets" });
		} catch (error) { return error }

	};

	static associate(models) {
		this.belongsTo(models.Event, { foreignKey: "event_id", as: "events" });
	}

}

module.exports = Ticket;