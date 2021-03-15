const { Command } = require("../client");
const fs = require("fs");
const path = require("path");

module.exports = new Command({
	name: "prefix",
	description: "Changes the guild prefix.",
	usage: "prefix [desired prefix]",
	examples: ["prefix gd?"],
	execute(client, message, args) {
		let prefixes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "db", "prefixes.json")).toString());

		if (!args[0]) return message.channel.send(`The current prefix is \`${prefixes[message.guild.id]}\`.`);
		if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the following permissions: `MANAGE_GUILD`");

		prefixes[message.guild.id] = args[0];

		fs.writeFileSync(path.resolve(__dirname, "..", "db", "prefixes.json"), JSON.stringify(prefixes, null, 4).replace(/    /g, "\t"));

		message.channel.send(`Prefix set to \`${args[0]}\`.`);
	}
});