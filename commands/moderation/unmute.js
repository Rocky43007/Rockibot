const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite://./databases/logs.sqlite');


module.exports = class Unmute extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'moderation',
			memberName: 'unmute',
			description: 'Used to unmute users.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [{
				key: 'user',
				label: 'user',
				prompt: 'Which user would you like to unmute? Please specify one only.',
				type: 'member',
			}],

			guildOnly: true,
		});
	}
	async run(message, { user }) {
		const logs = await logsdb.get(message.guild.id);
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Muted' role does not exist. Please create the 'Muted' role for the mute command.`);
		}
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to unmute.`);
		}
		if(user.roles.cache.has(role)) {
			return message.channel.send(`**${message.author.username}**, The user is already unmuted.`);
		}

		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Unmute')
			.addField('Offender:', `**${user}**`)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);

		user.roles.remove(role.id).catch(console.error).then(
			user.send(`You have been unmuted from ${message.guild.name}.`),
		);
	}
};