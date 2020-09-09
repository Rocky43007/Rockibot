const { Command } = require('discord.js-commando');
const config = require('/home/ricky/DiscordBotTest/config.json');
const queues = {};
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const opts = {
	part: 'snippet',
	maxResults: 10,
	key: config.youtube_api_key,
};
const Spotify = require('')

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
			const stream = ytdl(song, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish');
			setTimeout(10000);
		});
	}
};