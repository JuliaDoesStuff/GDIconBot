const { Event } = require("../client");
const fs = require("fs");
const path = require("path");

module.exports = new Event({
	name: "message",
	listener(client, message) {
		if (message.author.bot) return;
		if (message.channel.type == "dm") return;

		let prefixes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "db", "prefixes.json")).toString());
		if (!prefixes[message.guild.id]) {
			prefixes[message.guild.id] = "gd!";
			fs.writeFileSync(path.resolve(__dirname, "..", "db", "prefixes.json"), JSON.stringify(prefixes, null, 4).replace(/    /g, "\t"));
		}

		let prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${prefixes[message.guild.id].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
		if (!prefixRegex.test(message.content)) return;

		let args = message.content.slice(message.content.match(prefixRegex)[1].length).trim().split(/ +/);
		let cmd = args.shift().toLowerCase();

		let command = client.commands.get(cmd) || client.commands.find(x => x.aliases && x.aliases.includes(cmd));
		if (command) command.execute(client, message, args);
	}
});