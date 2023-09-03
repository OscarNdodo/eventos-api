const path = require("path");
require("dotenv").config();
require("./database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");


const app = express();


app.use((req, res, next) => {
	res.header("Acces-Control-Allow-Origin", "http://localhost:5173");
	res.header("Acces-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Acces-Control-Allow-Headers", "X-PINGOTHER", "Control-Type, Authorization");
	app.use(cors());
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors("http://localhost:5173"));
app.use("/files", express.static(path.resolve(__dirname, "services", "files")));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("http://localhost:" + PORT));