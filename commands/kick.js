const discord = require('discord.js');

module.exports = {
	name: 'kick',
	category: 'moderation',
	description: 'Used to kick users. What did ya expect?',
	usage: '<@user> <reason>',
	guildOnly: true,
	execute(message, args) {

		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`);
		}

		const target = message.mentions.members.first();

		if(!target) {
			return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`);
		}

		if(target.id === message.author.id) {
			return message.channel.send(`**${message.author.username}**, You can not kick yourself`);
		}

		if(!args[1]) {
			return message.channel.send(`**${message.author.username}**, Please give a reason to kick`);
		}

		const embed = new discord.MessageEmbed()
			.setTitle('Action: Kick')
			.setDescription(`Kicked ${target} (${target.id})`)
			.setColor('#ff2050')
			.setFooter(`Kicked by ${message.author.username}`);

		message.channel.send(embed);

		target.kick(args[1]);


	},
};