const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Invite extends Command {
	constructor(client) {
		super(client, {
			name: 'support',
			group: 'miscellaneous',
			memberName: 'support',
			description: 'Sends link for support server.',
		});
	}
	run(message) {
		message.author.send("https://discord.gg/p5yBqkkW")
	}
};
