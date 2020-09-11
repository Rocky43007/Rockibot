const { Command } = require('discord.js-commando');

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
	async run(message, connection) {
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('This command can only be run if you are in a voice channel!');
		}
		connection.pause();
	}
};