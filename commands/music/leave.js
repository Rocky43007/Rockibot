const { Command } = require('discord.js-commando');

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
		}
	}
};