const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MusicPause extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			description: 'Allows bot to pause the music playing in the voice channel.',
			guildOnly: true,
		});
	}
	run(message, connection) {
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
		const embed = new Discord.MessageEmbed()
			.setColor('#c22419')
			.setTitle('You need to be in a voice channel!')
		return message.channel.send(embed);
		}
		connection.pause();
	}
};