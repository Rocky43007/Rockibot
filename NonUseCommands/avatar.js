module.exports = {
	name: 'avatar',
	description: 'Gives mentioned user\'s Avatar',
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}
	},
};
