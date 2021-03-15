const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const RandomIconGen = require("./RandomIconGen");
const arg = require("arg");

class BotClient extends Client {
	constructor(options = {}) {
		super(options);

		this.commands = new Collection();
		this.token = options.token;
		this.prefix = options.prefix;

		if (typeof options.commandFolder != "undefined") {
			for (const file of fs.readdirSync(options.commandFolder)) {
				let command = require(path.resolve(options.commandFolder, file));
				this.commands.set(command.name, command);
			}
		}
		if (typeof options.eventFolder != "undefined") {
			for (const file of fs.readdirSync(options.eventFolder)) {
				let event = require(path.resolve(options.eventFolder, file));
				this.on(event.name, event.listener.bind(null, this));
			}
		}
	}

	getRIG(argv) {
		let args = arg({
			"--user": String,
			"--form": String,
			"--icon": Number,
			"--col1": Number,
			"--col2": Number,
			"--glow": Boolean,
		}, { argv });

		return new RandomIconGen({
			user: args["--user"] ? args["--user"] : undefined,
			form: args["--form"] ? args["--form"] : undefined,
			icon: args["--icon"] ? args["--icon"] : undefined,
			col1: args["--col1"] ? args["--col1"] : undefined,
			col2: args["--col2"] ? args["--col2"] : undefined,
			glow: args["--glow"] ? args["--glow"] : undefined
		});
	}

	login() {
		super.login(this.token);
	}
}

module.exports = BotClient;