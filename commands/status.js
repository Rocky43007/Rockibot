module.exports = {
	name: 'status',
	aliases: ['s'],
	description: 'Used to check if commands work with the bot.',
	execute(message) {
		message.react('743561624979374323');
	},
};