module.exports = {
	name: 'stats',
	description: 'Server Stats',
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};