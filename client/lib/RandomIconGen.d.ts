type RIGOptions = {
	user?: string;
	form?: string;
	icon?: number;
	col1?: number;
	col2?: number;
	glow?: boolean
}

declare class RandomIconGen {
	constructor(options?: RIGOptions);
	public user: string;
	public form: string;
	public icon: number;
	public col1: number;
	public col2: number;
	public glow: boolean;
	public generateIcon(): URL;
}

export = RandomIconGen;