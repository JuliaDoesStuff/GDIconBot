import { Client, ClientEvents, ClientOptions, Collection, Message, MessageEmbed, MessageEmbedOptions } from "discord.js";
import RandomIconGen from "./lib/RandomIconGen";

type BotClientOptions = ClientOptions & {
	token: string;
	prefix: string;
	commandFolder: string;
	eventFolder: string;
}

type BotCommandOptions = {
	name: string;
	description: string;
	aliases?: string[];
	usage: string;
	examples: string[];
	execute(client: BotClient, message: Message, args: string[]): void;
}

type BotEventOptions<K extends keyof ClientEvents> = {
	name: K;
	listener(client: BotClient, ...args: ClientEvents[K]): void;
}

declare class BotClient extends Client {
	constructor(options: BotClientOptions);

	public commands: Collection<string, BotCommand>;
	public options: BotClientOptions;
	public login(): Promise<string>;
	public getRIG(argv: string[]): RandomIconGen;

	public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
	public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
	public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
}


declare class BotCommand {
	constructor(options: BotCommandOptions);

	public name: string;
	public description: string;
	public aliases: string[];
	public usage: string;
	public examples: string[];
	public execute(client: BotClient, message: Message, args: string[]): void;
}

declare class BotEvent<K extends keyof ClientEvents> {
	constructor(options: BotEventOptions<K>);
	
	public name: string;
	public listener(client: BotClient, ...args: any[]): void;
}

declare class BotEmbed extends MessageEmbed {
	constructor(data: MessageEmbedOptions);
}

declare class GDIconBot {
	public static Client: typeof BotClient;
	public static Command: typeof BotCommand;
	public static Embed: typeof BotEmbed;
	public static Event: typeof BotEvent;
}

export = GDIconBot;