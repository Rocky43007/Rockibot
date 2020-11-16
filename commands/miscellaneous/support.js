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
        const embed = new Discord.MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('Join the support server!')
			.setURL("https://discord.gg/rdGrcvW");
		return message.channel.send(embed);
	}
};
