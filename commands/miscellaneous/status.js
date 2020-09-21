const { Command } = require('discord.js-commando');

module.exports = class Status extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			aliases: ['s'],
			group: 'miscellaneous',
			memberName: 'status',
			description: 'Used to check if commands work with the bot.',
		});
	}
	run(message) {
		message.react('743561624979374323');
	}
}; 