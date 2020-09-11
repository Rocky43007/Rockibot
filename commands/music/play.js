const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

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
	async run(message, { song }) {
		
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('Please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			if (song.content.includes('https://open.spotify.com/')) { 
				const newlink = replace('https://open.spotify.com/', '');
				message.send(newlink);
			} 
			else {
			const stream = ytdl(song, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
			dispatcher.on('finish');
			}
		});
	}
};