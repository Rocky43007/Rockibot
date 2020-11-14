module.exports = {
	name: 'support',
	description: 'Sends the link to join the support server.',
	execute(message, args) {
		message.author.send("https://discord.gg/pjbRn78ayW")
	},
};