const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

module.exports = class MusicPlay extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'music',
			memberName: 'play',
			description: 'Allows bot to play music for the user in a voice channel.',
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
			dispatcher.on('finish');
			});
		}	
};