const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class RemoveData extends Command {
	constructor(client) {
		super(client, {
			name: 'removedata',
			aliases: ['deletedata'],
			group: 'first',
			memberName: 'removedata',
			description: 'Removes data that belongs to server from our databases.',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			ownerOnly: true,
		});
	}
	async run(message) {
		await logsdb.get('746341162528407593');
		await logsdb.delete('746341162528407593');
		message.reply(`Delete?: ${await logsdb.get('746341162528407593')}`);
		// return message.reply('All data has been deleted from the bot\'s databases.');
	}
};