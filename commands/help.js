const { Command, Embed } = require("../client");

module.exports = new Command({
	name: "help",
	description: "Gets info for each command, or gets the commands.",
	aliases: ["commands", "cmds"],
	usage: "help [command]",
	examples: ["help", "help ping"],
	execute(client, message, args) {
		if (client.commands.has(args[0])) return message.channel.send(new Embed({
			title: `GD Icon Bot commands: \`${client.commands.get(args[0]).name}\``,
			description: client.commands.get(args[0]).description,
			fields: [
				{
					name: "Alias(es)",
					value: client.commands.get(args[0]).aliases ? client.commands.get(args[0]).aliases.join(", ") : "None"
				},
				{
					name: "Usage",
					value: client.commands.get(args[0]).usage
				},
				{
					name: "Example(s)",
					value: `\`${client.commands.get(args[0]).examples.join("`\n`")}\``
				}
			]
		}));
		
		let helpEmbed = new Embed({
			title: "GD Icon Bot commands",
			description: `Use \`help [command]\` for specific command help`
		});

		for (const command of client.commands.array()) helpEmbed.addField(command.name, command.description);

		message.channel.send(helpEmbed);
	}
});