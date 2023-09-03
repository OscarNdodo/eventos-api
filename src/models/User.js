const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
	static init(sequelize) {
		try {
			super.init({
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				pass: DataTypes.STRING,
				phone: DataTypes.STRING,
				logged: DataTypes.BOOLEAN
			}, {
				sequelize, tableName: "users", hooks: {
					beforeCreate: (User) => {
						const salt = bcrypt.genSaltSync();
						User.pass = bcrypt.hashSync(User.pass, salt);
					}
				}
			})
		} catch (error) {
			return error
		}
	};
	static associate(models) {
		this.hasMany(models.Event, { foreignKey: "user_id", as: "events" });
	}
}

module.exports = User;