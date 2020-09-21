const { Command } = require('discord.js-commando');

module.exports = class MusicJoin extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			aliases: ['j'],
			group: 'music',
			memberName: 'join',
			description: 'Allows bot to join user in voice channel.',
			guildOnly: true,
		});
	}
	async run(message) {
		if (message.member.voice.channel) {
			message.react('744946125202784306');
			await message.member.voice.channel.join();
		}
	}
};