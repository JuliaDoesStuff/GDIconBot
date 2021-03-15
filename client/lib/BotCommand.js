class BotCommand {
	constructor(options = {}) {
		this.name = options.name;
		this.description = options.description;
		this.aliases = options.aliases;
		this.usage = options.usage;
		this.examples = options.examples;
		this.execute = options.execute;
	}
}

module.exports = BotCommand;