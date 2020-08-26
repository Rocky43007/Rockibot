const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class Kick extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			aliases: ['k'],
			group: 'moderation',
			memberName: 'kick',
			description: 'Used to kick users. What did ya expect?',
			clientPermissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
			userPermissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to kick?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the kick message to be?',
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
		if (!message.guild.me.hasPermission('KICK_MEMBERS', 'ADMINISTRATOR')) return message.reply('I need the permission `KICK_MEMBERS` for this to work.');
		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Kick')
			.addField('Offender:', `**${user}**`)
			.addField('Reason:', content)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);
		user.send(`You have been kicked from ${message.guild.name} for: ${content}`).then(function() {
			message.guild.member(user).kick();
			message.say('Successfully kicked ' + user);
		});
	}
};