const Discord = require('discord.js');
const Client = new Discord.Client();
const { Command } = require('discord.js-commando');

module.exports = class Invite extends Command {
	constructor(client) {
		super(client, {
            name: 'changelog',
            aliases: ['cl'],
			group: 'miscellaneous',
			memberName: 'changelog',
			description: 'Show\'s the latest changelog of the bot!',
		});
	}
	run(message) {
        const embed = new Discord.MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('Rockibot\'s Changelog!')
			.setDescription(`
			\`v1.3.1-beta\` has been released!
			**Change Log:**
			1) There's now a leveling system! You gain 1 XP per message. You can see your level and XP with \`!level\`, and see the server leaderboard with \`!leaderboard\` or \`!lb\`! You require 100 XP per level.

			**Bugs that are being worked on:** 
			1) Pizza Town's income is wack.
			2) Music is wack as well. \`!play\` doesn't play anything.`)
			.setTimestamp();
		return message.channel.send(embed);
            // do what you need with lastMessage below
	}
};
