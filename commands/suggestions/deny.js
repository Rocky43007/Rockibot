/* eslint-disable no-mixed-spaces-and-tabs */
const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const Keyv = require('keyv');
const schanneldb = new Keyv(process.env.DATABASE_URL, { table: 'schanneldb' });
const suggestdb = new Keyv(process.env.DATABASE_URL, { table: 'suggestdb' });
const suggestnum = new Keyv(process.env.DATABASE_URL, { table: 'suggestnum' });
const suggestuser = new Keyv(process.env.DATABASE_URL, { table: 'suggestuser' });
const suggestuserIM = new Keyv(process.env.DATABASE_URL, { table: 'suggestuserIM' });

module.exports = class Sdeny extends Command {
	constructor(client) {
		super(client, {
			name: 'deny',
			group: 'suggestions',
			memberName: 'deny',
			description: 'Used to deny a suggestion.',
			clientPermissions: ['ADMINISTRATOR', 'SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'msgid',
					prompt: 'Which suggestion would you like to deny? (Use the message id)',
					type: 'string',
				},
				{
					key: 'comments',
					prompt: 'Any comments?',
					type: 'string',
					default: 'No comments given.',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { msgid, comments }) {
		const author = await suggestuser.get(msgid);
		const suggest = await suggestdb.get(msgid);
		const casenum = await suggestnum.get(msgid);
		const authorIM = await suggestuserIM.get(msgid);
		const embed = new discord.MessageEmbed()
			.setColor('#8B0000')
			.setAuthor(author, authorIM)
			.setTitle(`Suggestion #${casenum} Denied`)
			.setDescription(suggest)
			.addField(`Comment from ${message.author.tag}:`, comments);

		const schannel = await schanneldb.get(message.guild.id);
		const sChannel = message.guild.channels.cache.find(c => c.name === schannel);
		if (!sChannel) return;
		await sChannel.messages.fetch(msgid).then(msg =>
			msg.edit(embed));

	}
};
