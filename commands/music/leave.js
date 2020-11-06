const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MusicLeave extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			aliases: ['l'],
			group: 'music',
			memberName: 'leave',
			description: 'Makes the bot to leave the voice channel.',
			guildOnly: true,
		});
	}
	async run(message) {
		if (message.member.voice.channel) {
			message.react('744941038678048798');
			const connection = await message.member.voice.channel.join();
			connection.disconnect();
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor('#c22419')
				.setTitle('You need to be in a voice channel!')
			return message.channel.send(embed);
		}
	}
};