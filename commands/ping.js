const { Command, Embed } = require("../client");

module.exports = new Command({
	name: "ping",
	description: "Checks the bot and API latency.",
	aliases: ["latency"],
	usage: "ping",
	examples: ["ping"],
	execute(client, message) {
		message.channel.send("Pinging...").then(msg => {
			msg.edit("Pong!", new Embed({
				title: "Latency",
				fields: [
					{
						name: "Bot Latency",
						value: `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`
					},
					{
						name: "API Latency",
						value: `${Math.round(client.ws.ping)}ms`
					}
				]
			}));
		});
	}
});