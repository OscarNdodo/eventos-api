const jwt = require("jsonwebtoken");
const key = require("../config/key.json");

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			error: true,
			msg: "No token provider!"
		});
	}

	const parts = authHeader.split(" ");
	if (!parts.length == 2) {
		return res.status(401).json({
			error: true,
			msg: "Token error!"
		});
	}

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({
			error: true,
			msg: "Token malFormatted!"
		});
	}

	jwt.verify(token, key.secret, (error, decoded) => {
		if (error) {
			return res.status(401).json({
				error: true,
				msg: "Token Invalid!"
			});
		}

		req.id = decoded.id;
		console.log(decoded.id);
		return next();
	})

}