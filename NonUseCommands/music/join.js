const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MusicJoin extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			aliases: ['j'],
			group: 'music',
			memberName: 'join',
			description: 'Allows bot to join user in voice channel.',
			clientPermissions: ['CONNECT'],
			guildOnly: true,
		});
	}
	async run(message) {
		if (message.member.voice.channel) {
			message.react('744946125202784306');
			await message.member.voice.channel.join();
		} else {
		const embed = new Discord.MessageEmbed()
			.setColor('#c22419')
			.setTitle('You need to be in a voice channel!')
		return message.channel.send(embed);
		}
	}
};
