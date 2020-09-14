const { Command } = require('discord.js-commando');
const fs = require('fs');
const discord = require('discord.js');
const Keyv = require('keyv');
const schanneldb = new Keyv(process.env.DATABASE_URL, { table: 'schanneldb' });
const casenum = JSON.parse(fs.readFileSync('./databases/casenum.json'));
const suggestdb = new Keyv(process.env.DATABASE_URL, { table: 'suggestdb' });
const suggestnum = new Keyv(process.env.DATABASE_URL, { table: 'suggestnum' });
const suggestuser = new Keyv(process.env.DATABASE_URL, { table: 'suggestuser' });
const suggestuserIM = new Keyv(process.env.DATABASE_URL, { table: 'suggestuserIM' });
module.exports = class Suggest extends Command {
	constructor(client) {
		super(client, {
			name: 'suggestion',
			aliases: ['suggest'],
			group: 'suggestions',
			memberName: 'suggest',
			description: 'Used to send a suggestion.',
			clientPermissions: ['ADMINISTRATOR', 'SEND_MESSAGES'],
			usage: '!suggest suggestion',
			args: [
				{
					key: 'suggest',
					prompt: 'What would you like to suggest?',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { suggest }) {
		if (!casenum[message.guild.id]) {
			casenum[message.guild.id] = {
				case: 0,
			};
		}
		casenum[message.guild.id].case++;

		fs.writeFile('./databases/casenum.json', JSON.stringify(casenum), (err) => {
			if (err) {
				console.log(err);
			}
		});
		const schannel = await schanneldb.get(message.guild.id);
		const embed = new discord.MessageEmbed()
			.setColor('#738ADB')
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setTitle(`Suggestion #${casenum[message.guild.id].case}`)
			.setDescription(suggest);

		const sChannel = message.guild.channels.cache.find(c => c.name === schannel);
		if (!sChannel) return;
		const author = message.author.tag;
		const authorIM = message.author.avatarURL();
		message.reply(`Suggestion sent to ${sChannel}.`);
		sChannel.send({ embed: embed }).then(async embedMessage => {
			suggestuser.set(embedMessage.id, author),
			suggestuserIM.set(embedMessage.id, authorIM),
			suggestdb.set(embedMessage.id, suggest),
			suggestnum.set(embedMessage.id, casenum[message.guild.id].case),
			embedMessage.react('⬆️'),
			embedMessage.react('⬇️');
		});
	}
};
