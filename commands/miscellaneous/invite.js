const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Invite extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'miscellaneous',
			memberName: 'invite',
			description: 'Used to invite the bot to other servers.',
		});
	}
	run(message) {
		const embed = new Discord.MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('Invite Rocky\'s Modular Bot!')
			.setURL('https://discord.com/api/oauth2/authorize?client_id=739923682075476089&permissions=8&scope=bot');
		return message.channel.send(embed);
	}
};