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
			\`v1.2.0-beta\` has been released!
			**Change Log:**
			1) Addition of Pizza Town to the bot!
			2) Fix of music commands and addition of \`!clear\` which clears the queue.`)
			.setTimestamp();
		return message.channel.send(embed);
            // do what you need with lastMessage below
	}
};
