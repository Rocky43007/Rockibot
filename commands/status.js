module.exports = {
	name: 'status',
	category: 'Status',
	description: 'Used to check if bot it online and working.',
	aliases: ['s'],
	execute(message) {
		if(message.content === '!s') {
			return message.react('743561624979374323');
		}
		if(message.content == '!status') {
			return message.react('743561624979374323');
		}
	},
};