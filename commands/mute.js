const Discord = require('discord.js');

module.exports = {
	name: 'mute',
	category: 'moderation',
	description: 'Used to mute users for a specific amount of time.',
	usage: '<@user> <time>',
	guildOnly: true,
	execute: async (message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Muted' role does not exist. Please create the 'Muted' role.`);
		}
		const user = message.mentions.members.first();
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to mute.`);
		}
		if(user.roles.cache.has(role)) {
			return message.channel.send(`**${message.author.username}**, The user is already muted.`);
		}
		user.roles.add(role.id).catch(console.error);
		message.channel.send(`**${user}** has been muted for ${args[1] * 60000} minutes.`);

		setTimeout(async () => {await user.removeRoles(role);}, args[1] * 60000);

	},
};