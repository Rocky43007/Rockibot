const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class modlogs extends Command {
	constructor(client) {
		super(client, {
			name: 'modlog',
			group: 'moderation',
			memberName: 'modlogs',
			description: 'Used to set the mod-log of the server.',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'logs',
					prompt: 'Which channel do you want to set as the mod-log? (Without the `#`)',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { logs }) {
		await logsdb.set(message.guild.id, logs).then(
			message.channel.send(`Successfully set mod log to \`${logs}\``),
		);
	}
};