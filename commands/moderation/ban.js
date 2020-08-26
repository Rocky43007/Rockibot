const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class Ban extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['b'],
			group: 'moderation',
			memberName: 'ban',
			description: 'Used to ban users. What did ya expect?',
			clientPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
			userPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to ban?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the ban message to be?',
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
		if (!message.guild.me.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) return message.reply('I need the permission `BAN_MEMBERS` for this to work.');
		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Ban')
			.addField('Offender:', `**${user}**`)
			.addField('Reason:', content)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);
		user.send(`You have been banned from ${message.guild.name} for: ${content}`).then(function() {
			message.guild.member(user).ban();
			message.say('Successfully banned ' + user);
		});
	}
};