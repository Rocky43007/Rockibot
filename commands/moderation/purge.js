const discord = require('discord.js');
const Keyv = require('keyv');
const logsdb = new Keyv(process.env.DATABASE_URL);
const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'moderation',
			memberName: 'purge',
			description: 'Purges the Chat',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [
				{
					key: 'purgecount',
					prompt: 'How many messages should I purge??',
					type: 'integer',
				},
			],
			guildOnly: true,
		});
	}

	async run(message, args) {
		const logs = await logsdb.get(message.guild.id);
		// Purge Command!
		if (message.author.bot) return;
		if (args.purgecount > 100) {
			return message.reply(
				'You can only purge up to 100 messages at a time.',
			);
		}
		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Purge')
			.addField('Amount of text purged:', args.purgecount)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);

		await message.channel.messages
			.fetch({ limit: args.purgecount + 1 })
			.then(async messages => {
				// Fetches the messages
				await message.channel.bulkDelete(messages);
			})
			.then(() => {
				message
					.reply(`Sucessfully Deleted ${args.purgecount} messages.`)
					.then(message.channel.bulkDelete(1));
			});
	}
};