const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			aliases: ['t'],
			group: 'first',
			memberName: 'test',
			description: 'Replies with a testing123 text piece. [Owner Only]',
			ownerOnly: true,
		});
	}
	run(message) {
		return message.say('Testing 123.');
	}
}; 