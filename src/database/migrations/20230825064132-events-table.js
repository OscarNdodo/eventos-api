'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('events', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false
			},
			tickets: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			location: {
				type: Sequelize.STRING,
				allowNull: false
			},
			time: {
				type: Sequelize.TIME,
				allowNull: false
			},
			contact: {
				type: Sequelize.STRING,
				allowNull: false
			},
			contact_alt: Sequelize.STRING,
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATEONLY,
				allowNull: false
			}

		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('events');
	}
};
