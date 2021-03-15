const fetch = require("sync-fetch");

const forms = [
	"cube",
	"ship",
	"ball",
	"ufo",
	"wave",
	"robot",
	"spider"
]

class RandomIconGen {
	constructor(options = {}) {
		this._options = options ? options : {};
		this.user = options.user ? options.user : "";
		this.form = options.form ? options.form : "cube";
		this.icon = options.icon ? options.icon : 1;
		this.col1 = options.col1 ? options.col1 : 0;
		this.col2 = options.col2 ? options.col2 : 3;
		this.glow = options.glow ? options.glow : false;
	}

	_getIcons() {
		return fetch("https://gdbrowser.com/api/icons").json();
	}

	_rng(max) {
		return Math.floor(Math.random() * (max + 1));
	}

	generateIcon() {
		let icons = this._getIcons().icons;

		let form = typeof this._options.form != "undefined" ? this._options.form : forms[Math.floor(Math.random() * forms.length)];
		let icon = typeof this._options.icon != "undefined" ? this._options.icon : this._rng(icons.filter(x => x.startsWith(form)).length);
		let col1 = typeof this._options.col1 != "undefined" ? this._options.col1 : this._rng(icons.filter(x => x.startsWith("color")).length) - 1;
		let col2 = typeof this._options.col2 != "undefined" ? this._options.col2 : this._rng(icons.filter(x => x.startsWith("color")).length) - 1;
		let glow = typeof this._options.glow != "undefined" ? this._options.glow : this._rng(2) == 1 ? 1 : 0;

		let params = typeof this._options.user != "undefined" ? new URLSearchParams({ form }) : new URLSearchParams({
			form,
			icon,
			col1,
			col2,
			glow
		});

		return new URL(`https://gdbrowser.com/icon/${typeof this._options.user != "undefined" ? this._options.user : "icon"}?${params}`);
	}
}

module.exports = RandomIconGen;