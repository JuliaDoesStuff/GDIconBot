require("dotenv").config();

const { Client } = require("./client");
const path = require("path");
const client = new Client({
	token: process.env.TOKEN,
	prefix: "gd!",
	commandFolder: path.resolve(__dirname, "commands"),
	eventFolder: path.resolve(__dirname, "events")
});

client.login();