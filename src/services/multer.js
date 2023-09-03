const path = require("path");
const multer = require("multer");

module.exports = (
	multer({
		storage: multer.diskStorage({
			destination: (req, file, callback) => {

				const fileType = file.mimetype;
				const types = ["image/png", "image/jpeg", "image/jpg", "image/svg"];

				types.map((element) => {
					if (element != fileType) {
						return false;
					} else {
						callback(null, path.resolve(__dirname, "files"))
					}
				});

			},
			filename: (req, file, callback) => {
				callback(null, `IMG${Date.now().toString()}${path.extname(file.originalname)}`);
			}
		})
	})
);