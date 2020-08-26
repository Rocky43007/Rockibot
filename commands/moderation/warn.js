const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const fs = require('fs');
const ms = require('ms');
const warns = JSON.parse(fs.readFileSync('./databases/warning.json'));
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class Warn extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			aliases: ['w'],
			group: 'moderation',
			memberName: 'warn',
			description: 'Used to warn users.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to warn?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the warn message to be?',
					type: 'string',
					default: 'No Reason Given',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { user, content }) {
		const logs = await logsdb.get(message.guild.id);
		if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not ban this user, he has higher permission than I do.');
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.reply('I need the permission `MANAGE_MESSAGES` or `ADMINISRATOR` for this to work.');
		if (!warns[user.id]) {
			warns[user.id] = {
				warns: 0,
			};
		}
		warns[user.id].warns++;

		fs.writeFile('./warning.json', JSON.stringify(warns), (err) => {
			if (err) {
				console.log(err);
			}
		});
		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Warn')
			.addField('Offender:', `**${user}**`)
			.addField('Reason:', content)
			.addField('Moderator:', `${message.author}`)
			.addField('Warns:', warns[user.id].warns)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);

		if (warns[user.id] == 3) {
			const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
			if (!muterole) return message.reply('Create the `Muted` role.');

			const mutetime = '10s';
			await (user.roles.add(muterole.id));
			message.channel.send(`**${user.tag}** has been temporarily muted.`);
			setTimeout(function() {
				user.roles.remove(muterole.id);
				message.channel.reply(`**${user.tag}** has been unmuted.`);
			}, ms(mutetime));

		}

		user.send(`You have been warned in ${message.guild.name} for: ${content}`).then(function() {
			message.say(`**${user}** has been warned for: ${content}.`);
		});
	}
};