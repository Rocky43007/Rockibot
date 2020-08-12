module.exports = {
	name: 'unmute',
	description: 'Unmute anyone after muting them.',
	category: 'moderation',
	usage: '<@user> <reason>',
	execute: async (message, args) => {
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'Sorry but you do not have permission to unmute anyone',
			);
		}

		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send('I do not have permission to manage roles.');
		}

		const user = message.mentions.members.first();

		if (!user) {
			return message.channel.send(
				'Please mention the member to who you want to unmute',
			);
		}

		const muterole = message.guild.roles.cache.find(x => x.name === 'Muted');


		if(user.roles.cache.has(muterole)) {
			return message.channel.send('Given user do not have mute role so what I am suppose to take');
		}


		user.roles.remove(muterole);

		await message.channel.send(`**${message.mentions.users.first().username}** is unmuted`);

		user.send(`You are now unmuted from **${message.guild.name}**`);

	},
};