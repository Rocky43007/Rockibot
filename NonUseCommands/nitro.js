const Keyv = require('keyv');
const userid = new Keyv('sqlite:///home/ricky/DiscordBotTest/UserID.sqlite');

module.exports = {
	name: 'nitro',
	category: 'moderation',
	description: 'Used to mute users for a specific amount of time.',
	usage: '<@user> <time>',
	guildOnly: true,
	execute: async (message) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Nitro Booster');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Nitro Booster' role does not exist. Please create the 'Nitro Booster' role.`);
		}
		const user = message.mentions.members.first();
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to give the role to.`);
		}
		if(user.roles.cache.some(r => r.name === 'Nitro Booster')) {
			return message.channel.send(`**${message.author.username}**, The user already has the role.`);
		}
		if(!user.roles.cache.some(r => r.name === 'Nitro Booster')) {
			const UserID = message.mentions.users.first().id;
			console.log(UserID);
			await userid.set(message.mentions.user.first().id);
		}

	},
};