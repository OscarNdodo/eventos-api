'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tickets', {
			id: {
				ttype: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: true
			},
			event_id: {
				ttype: Sequelize.UUID,
				allowNull: false,
				references: { model: "events", key: "id" },
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			},
			name: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
			validate: {
				type: Sequelize.DATE,
				allowNull: false
			},
			location: {
				type: Sequelize.STRING,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}

		});

	},

	async down(queryInterface, Sequelize) {

		await queryInterface.dropTable('tickets');

	}
};
