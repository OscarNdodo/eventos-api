const express = require("express");
const multer = require("../services/multer");
const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");
const jwt = require("../services/jwt");

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		error: false,
		msg: "Bem-Vindo"
	})
})

//user
router.post("/user/create", UserController.store);
router.post("/login", UserController.login);
router.get("/logout/:id", UserController.logout);

//event -> private actions
router.post("/user/:user_id/event/create", jwt, multer.single("image"), EventController.store);
router.put("/user/:user_id/event/:id/update", jwt, multer.single("image"), EventController.update);
router.get("/user/:user_id/events", jwt, EventController.index);
router.delete("/user/:user_id/event/:id/delete", jwt, EventController.delete);
//event -> public actions
router.get("/event/:id/details", EventController.details);
router.get("/events/:limit", EventController.list);
router.post("/search", EventController.search);


module.exports = router;