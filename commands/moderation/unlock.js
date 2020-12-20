const { Command } = require('discord.js-commando');

module.exports = class Echo extends Command {
	constructor(client) {
		super(client, {
			name: 'unlock',
			group: 'moderation',
			memberName: 'unlock',
			description: 'Unlock a channel.',
			clientPermissions: ['MANAGE_ROLES'],
			userPermissions: ['MANAGE_MESSAGES'],
            args: [
				{
					key: 'channel',
					prompt: 'Which channel do you want to lock down?',
					type: 'channel',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, {channel}) {
  		const ow = channel.permissionOverwrites.get(message.guild.id); // get the permissionOverwrites fro that role

		// If the overwrites exist and SEND_MESSAGES is set to false, then it's already locked
		if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES')) {
			return message.channel.send("The channel is already unlocked.");
		} 
		else { // otherwise, lock it
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
			message.channel.send(`✅ ${channel} has been unlocked.`)
		}
	}
};
