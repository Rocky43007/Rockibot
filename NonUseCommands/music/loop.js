const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

module.exports = class MusicLoop extends Command {
	constructor(client) {
		super(client, {
			name: 'loop',
			group: 'music',
			memberName: 'loop',
			description: 'Allows bot to loop the music playing in a voice channel',
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to listen to?',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	run(message, { song }) {
		
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			const embed = new Discord.MessageEmbed()
				.setColor('#c22419')
				.setTitle('You need to be in a voice channel!')
			return message.channel.send(embed);
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl(song, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
			dispatcher.on('finish').then(
			connection.play(stream),
			);
			});
		}	
};
