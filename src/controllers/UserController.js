const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/key.json");

const generateToken = (params = {}) => {
	return jwt.sign(params, key.secret);
}

module.exports = {

	async store(req, res) {
		try {

			const { name, email, pass, phone } = req.body;
			const user = await User.findOne({
				where: { email }
			});

			if (user) {
				return res.status(400).json({
					error: true,
					msg: "ERRO: Dados Incorretos!"
				});
			} else {
				const user = await User.create({ name, email, pass, phone });
				if (!user) {
					return res.status(400).json({
						error: true,
						msg: "ERRO: Tente Novamente!"
					});
				} else {
					return res.json({
						error: false,
						msg: "Bem-Vindo " + user.name + "!"
					})
				}
			}

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			});
		}
	},
	async login(req, res) {
		try {
			const { email, pass } = req.body;

			let user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "Email ou Senha Incorreta!"
				});
			} else {
				if (!bcrypt.compareSync(pass, user.pass)) {
					return res.status(400).json({
						error: true,
						msg: "Email ou Senha Incorreta!"
					});
				} else {
					const id = user.id;
					await User.update({ logged: true }, {
						where: { id }
					})
					user = await User.findByPk(id);
					user.pass = undefined;
					//JWT
					const token = generateToken({ id: user.id });
					return res.json({
						error: false,
						user,
						token
					});
				}
			}

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			})
		}
	},

	async logout(req, res) {
		try {

			const { id } = req.params;

			const user = await User.findByPk(id);

			if (!user) {
				return res.status(404).json({
					error: true,
					msg: "User not found!"
				});
			}

			const logged = await User.update({ logged: false }, { where: { id } });
			if (!logged) {
				return res.status(400).json({
					error: true,
					msg: "ERROR: Try again."
				});
			} else {
				return res.json({
					error: false,
					msg: "See you soon!"
				})
			}

		} catch (error) {
			return res.status(400).json({
				error: true,
				error
			})
		}
	}

}