const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
var servers = {};


module.exports = class MusicPlay extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'music',
			memberName: 'newplay',
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
		if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
		};
		if (message.channel.type === 'dm') return;
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			const embed = new Discord.MessageEmbed()
				.setColor('#c22419')
				.setTitle('You need to be in a voice channel!')
			return message.channel.send(embed);
		}

		var server = servers[message.guild.id];
		server.queue.push(song);
		console.log(server.queue.push(song));
		var extqueue = server.queue[0];
		module.exports = { extqueue };
		voiceChannel.join().then(connection => {

		var server = servers[message.guild.id];
		server.dispatcher = connection.play(ytdl(server.queue[0], { filter: 'audioonly' }));

		server.queue.shift();

		server.dispatcher.on("finish", function() {
		if (server.queue[0]){
		server.dispatcher = connection.play(ytdl(server.queue[0], { filter: 'audioonly' }));
		};
		});
		});
		};
};
