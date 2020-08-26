const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

module.exports = class Mute extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			aliases: ['m'],
			group: 'moderation',
			memberName: 'mute',
			description: 'Used to mute users.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_ROLES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES', 'MUTE_MEMBERS'],
			args: [{
				key: 'user',
				label: 'user',
				prompt: 'What user would you like to mute? Please specify one only.',
				type: 'member',
			},
			{
				key: 'time',
				label: 'time',
				prompt: 'How long will the user be muted for?',
				type: 'integer',
			},
			{
				key: 'reason',
				label: 'reason',
				prompt: 'Why is the user being muted?',
				type: 'string',
				default: 'No Reason Given.',
			}],

			guildOnly: true,
		});
	}
	async run(message, { user, reason, time }) {
		const logs = await logsdb.get(message.guild.id);
		const args = time;
		if(!message.member.hasPermission(['MANAGE_MESSAGES', 'MUTE_MEMBERS'])) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Muted' role does not exist. Please create the 'Muted' role.`);
		}
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to mute.`);
		}
		if(user.roles.cache.has(role)) {
			return message.channel.send(`**${message.author.username}**, The user is already muted.`);
		}

		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Mute')
			.addField('Offender:', `**${user}**`)
			.addField('Reason:', reason)
			.addField('Duration', `${args} minute(s)`)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === logs);
		if (!sChannel) return;
		sChannel.send(embed);

		user.roles.add(role.id).catch(console.error).then(
			user.send(`You have been muted from ${message.guild.name} for ${args} minute(s) because of: ${reason}`),
			message.say(`**${user}** has been muted for ${args} minute(s) because of: ${reason}`),
		);
		const unmuteembed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Unmute')
			.addField('Offender:', `**${user}**`)
			.addField('Moderator:', `${message.author}`)
			.setFooter(message.createdAt.toLocaleString());

		setTimeout(async () => {
			await user.roles.remove(role).then(
				sChannel.send(unmuteembed),
				user.send(`You have been unmuted from ${message.guild.name}.`),
			);
		}, args * 60000);
	}
};