const { Command } = require('discord.js-commando');
const fs = require('fs');
const discord = require('discord.js');
const Keyv = require('keyv');
const logpath1 = path.join(__dirname, 'databases/suggestc.sqlite');
const logpath2 = path.join(__dirname, 'databases/suggestdb.sqlite');
const logpath3 = path.join(__dirname, 'databases/suggestnum.sqlite');
const logpath4 = path.join(__dirname, 'databases/suggestuser.sqlite');
const logpath5 = path.join(__dirname, 'databases/suggestuserIM.sqlite');
const schanneldb = new Keyv(`sqlite:///${logpath1}`);
const casenum = JSON.parse(fs.readFileSync('./databases/casenum.json'));
const suggestdb = new Keyv(`sqlite:///${logpath2}`);
const suggestnum = new Keyv(`sqlite:///${logpath3}`);
const suggestuser = new Keyv(`sqlite:///${logpath4}`);
const suggestuserIM = new Keyv(`sqlite:///${logpath5}`);
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
