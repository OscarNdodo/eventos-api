const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Event = require("../models/Event");
const { Sequelize } = require("sequelize");

module.exports = {

	async store(req, res) {

		try {
			//Tratamento de arquivos (images)
			const file_size = req.file.size / 1024 / 1024;

			if (file_size > 2) {
				fs.unlink(path.resolve(__dirname, "..", "services", "files", req.file.filename), (errr) => {
					if (errr) throw errr;
				});
				return res.status(400).json({
					error: true,
					msg: "Maximum of file 2MB"
				});
			}
			const image = req.file.filename;
			const { title, description, date, location, time, contact_alt } = req.body;
			const { user_id } = req.params;

			const user = await User.findByPk(user_id);
			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "User not Found!"
				});
			} else {
				const contact = user.phone;
				const isEvent = await Event.findOne({ where: { title } });
				if (isEvent) {
					fs.unlink(path.resolve(__dirname, "..", "services", "files", req.file.filename), (errr) => {
						if (errr) throw errr;
					});
					return res.status(400).json({
						error: true,
						msg: "Event already exist!"
					});
				} else {
					const event = await Event.create({
						title,
						description,
						image,
						date,
						location,
						time,
						contact,
						contact_alt,
						user_id
					});

					if (!event) {
						return res.status(400).json({
							error: true,
							msg: "ERROR: Try again later!"
						});
					} else {
						return res.json({
							error: false,
							msg: "Event created!"
						});
					}

				}

			}

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}


	},
	async details(req, res) {
		try {
			const { id } = req.params;

			const event = await Event.findByPk(id, {
				include: { association: "users" }
			});
			if (!event) {
				return res.status(404).json({
					error: true,
					msg: "Event not found!"
				});
			} else {
				event.users.pass = undefined;
				event.users.email = undefined;
				return res.json({
					error: false,
					event
				});
			}
		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			})
		}
	},
	async index(req, res) {
		try {

			const { user_id } = req.params;
			const user = await User.findByPk(user_id, {
				include: { association: "events" }
			});
			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "User not found!"
				});
			}

			return res.json({
				error: false,
				events: user.events
			});

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}
	},

	async list(req, res) {
		try {
			const { limit } = req.params;
			const events = await Event.findAndCountAll({
				limit: Number(limit),
			});
			if (!events) {
				return res.status(404).json({
					error: true,
					msg: "Events not found!"
				});
			}
			return res.json({
				error: false,
				events
			});

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}
	},
	async search(req, res) {
		try {

			const { title } = req.body;
			const results = await Event.findAll({
				where: {
					title: {
						[Sequelize.Op.like]: `%${title.trim()}%`
					}
				}
			});

			if (!results) {
				return res.status(404).json({
					error: true,
					msg: "Events not found!"
				});
			}

			return res.json({
				error: false,
				results
			});
		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}
	},
	async update(req, res) {

		try {
			//Tratamento de arquivos (images)
			const file_size = req.file.size / 1024 / 1024;

			if (file_size > 2) {
				fs.unlink(path.resolve(__dirname, "..", "services", "files", req.file.filename), (errr) => {
					if (errr) throw errr;
				});
				return res.status(400).json({
					error: true,
					msg: "Maximum of file 2MB"
				});
			}
			const image = req.file.filename;
			const { title, description, date, location, time, contact_alt } = req.body;
			const { user_id, id } = req.params;

			const user = await User.findByPk(user_id);
			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "User not Found!"
				});
			}
			const contact = user.phone;
			const isEvent = await Event.findOne({ where: { title } });
			if (isEvent) {
				fs.unlink(path.resolve(__dirname, "..", "services", "files", req.file.filename), (errr) => {
					if (errr) throw errr;
				});
				return res.status(400).json({
					error: true,
					msg: "Event already exist!"
				});
			}

			const newEvent = await Event.findByPk(id);
			if (!newEvent) {
				return res.status(400).json({
					error: true,
					msg: "Event not Found!"
				});
			}

			if (user.id == newEvent.user_id) {
				const event = await Event.update({
					title,
					description,
					image,
					date,
					location,
					time,
					contact,
					contact_alt,
					user_id
				}, { where: { id } });

				if (!event) {
					return res.status(400).json({
						error: true,
						msg: "ERROR: Try again later!"
					});
				} else {
					return res.json({
						error: false,
						msg: "Event updated!"
					});
				}
			}
			return res.status(401).json({
				error: false,
				msg: "Event Unknow!"
			});

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}


	},
	async delete(req, res) {
		try {

			const { user_id, id } = req.params;

			const user = await User.findByPk(user_id);
			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "User not found!"
				});
			}

			const isEvent = await Event.findByPk(id);
			if (!isEvent) {
				return res.status(404).json({
					error: true,
					msg: "Event not found!"
				});
			}

			if (user.id == isEvent.user_id) {
				// const image = isEvent.image;

				// fs.unlink(path.resolve(__dirname, "..", "services", "files", image), (error) => {
				// 	if (error) return res.status(400).json({
				// 		error: true,
				// 		msg: "Erro: try again later!"
				// 	})
				// } )

				const event = await Event.destroy({ where: { id } });

				if (!event) {
					return res.status(400).json({
						error: true,
						msg: "ERROR: Try again later!"
					});
				} else {
					return res.json({
						error: false,
						msg: "Event deleted!"
					});
				}
			}
			return res.status(400).json({
				error: true,
				msg: "Event Unknow!"
			});

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}

	}

}