const discord = require('discord.js');

module.exports = {
	name: 'unban',
	category: 'moderation',
	description: 'Used to unban users.',
	usage: '<@user> <reason>',
	execute: async (client, message, args) => {
		if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command.`);
		}
		if(!message.guild.me.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) {
			return message.channel.send(`**${message.author.username}**, I do not have the permission to unban someone.`);
		}

		const bannedMember = await client.fetchUser(args[0]);
		if(!bannedMember) {
			return message.channel.send(`**${message.author.username}**, You must input an User ID to unban someone.`);
		}

		let reason = args.slice(1).join(' ');
		if (!reason) {
			reason = 'No reason given.';
		}

		try {
			message.guild.unban(bannedMember, { reason: reason });
			message.channel.send(`**${bannedMember.tag}** has been unbanned.`);
		}
		catch (e) {
			console.log(e.message);
		}
	},
};