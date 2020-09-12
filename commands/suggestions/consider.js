/* eslint-disable no-mixed-spaces-and-tabs */
const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const Keyv = require('keyv');
const schanneldb = new Keyv(process.env.HEROKU_POSTGRESQL_CRIMSON_URL);
const suggestdb = new Keyv(process.env.HEROKU_POSTGRESQL_ROSE_URL);
const suggestnum = new Keyv(process.env.HEROKU_POSTGRESQL_WHITE_URL);
const suggestuser = new Keyv(process.env.HEROKU_POSTGRESQL_NAVY_URL);
const suggestuserIM = new Keyv(process.env.HEROKU_POSTGRESQL_IVORY_URL);

module.exports = class SConsider extends Command {
	constructor(client) {
		super(client, {
			name: 'consider',
			group: 'suggestions',
			memberName: 'consider',
			description: 'Used to consider a suggestion.',
			clientPermissions: ['ADMINISTRATOR', 'SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'msgid',
					prompt: 'Which suggestion would you like to consider? (Use the message id)',
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
			.setColor('#add8e6')
			.setAuthor(author, authorIM)
			.setTitle(`Suggestion #${casenum} Considered`)
			.setDescription(suggest)
			.addField(`Comment from ${message.author.tag}:`, comments);

		const schannel = await schanneldb.get(message.guild.id);
		const sChannel = message.guild.channels.cache.find(c => c.name === schannel);
		if (!sChannel) return;
		await sChannel.messages.fetch(msgid).then(msg =>
			msg.edit(embed));

	}
};
