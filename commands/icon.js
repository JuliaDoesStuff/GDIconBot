const { Command, Embed } = require("../client");

module.exports = new Command({
	name: "icon",
	description: "Generates a random icon, or with options.",
	usage: "icon [--form] [form] [--icon] [icon number] [--col1] [color number] [--col2] [color number] [--glow] [--user] [username]",
	examples: ["icon", "icon --user RobTop --form cube"],
	execute(client, message, args) {
		let rig = client.getRIG(args);

		message.channel.send(new Embed({
			title: "Generated Icon",
			description: "Type `regenerate` to regenerate icon.",
			image: { url: rig.generateIcon().toString() }
		})).then(msg => {
			let collector = message.channel.createMessageCollector(m => m.content.toLowerCase() == "regenerate", { time: 60000 });

			collector.on("collect", async m => {
				if (m.author.id != message.author.id) return;

				msg.edit(new Embed({
					title: "Generated Icon",
					description: "Type `regenerate` to regenerate icon.",
					image: { url: rig.generateIcon().toString() }
				}));
				
				try {
					m.delete()
				} catch (error) {
					console.error(error);
				}
			});
		});
	}
});