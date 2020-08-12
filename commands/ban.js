const discord = require('discord.js');

module.exports = {
	name: 'ban',
	category: 'moderation',
	description: 'Used to kick users. What did ya expect?',
	usage: '<@user> <reason>',
	guildOnly: true,
	execute(message, args) {

		if(!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}

		if(!message.guild.me.hasPermission(['BAN_MEMBERS'])) {
			return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`);
		}

		const user = message.mentions.members.first() || message.guild.members
			.get(args[0]);
		const banMember = message.guild.members.fetch(user);

		if(!banMember) {
			return message.channel.send('Please provide a user to ban.');
		}
		let reason = args.slice(1).join(' ');
		if (!reason) {
			reason = 'No reason given!';
		}

		message.delete();

		const embed = new discord.MessageEmbed()
			.setColor('#ff2050')
			.setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.addField('Moderation:', 'Ban')
			.addField('Banned:', user.user.username)
			.addField('Reason:', reason)
			.addField('Date:', message.createdAt.toLocaleString());

		const sChannel = message.guild.channels.cache.find(c => c.name === 'mod-log');
		sChannel.send(embed);

		user.send(`Hello, you have been banned from ${message.guild.me} for: ${reason}`).then(
			message.channel.send(`**${user.user.tag}** has been banned.`).then(
				user.ban(banMember, { days: 1, reason: reason }).catch(err => console.log(err))));


	},
};