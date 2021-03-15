const { Event } = require("../client");

module.exports = new Event({
	name: "ready",
	listener(client) {
		console.log(`${client.user.username} is now online!`);
		client.user.setActivity({ name: `Chaos ensue with ${client.users.cache.size} users`, type: "WATCHING" });
	}
})