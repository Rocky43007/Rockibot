const { Command } = require('discord.js-commando');
module.exports = class setconf extends Command {
	constructor(client) {
		super(client, {
			name: 'set',
			group: 'first',
			memberName: 'set',
			description: 'Replies with a configuaration sheet. [Owner Only]',
			ownerOnly: true,
		});
	}
	async run(message) {
		console.log(message.guild.id);
		const settings = message.guild.settings;
		console.log(settings);
		message.guild.setGroupEnabled("suggestions", false); 
		message.channel.send("Check Terminal.")
	}
}; 