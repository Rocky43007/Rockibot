const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('postgres://nxybxhywibmdwa:151664db949bc98a7c0e50f00e353c986fb0eaa73cd0d5c7822e05302da58daf@ec2-54-247-94-127.eu-west-1.compute.amazonaws.com:5432/d43cg9va8eungp', { table: 'modlogs' });

logsdb.on('error', handleConnectionError);

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