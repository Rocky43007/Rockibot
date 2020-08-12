module.exports = {
	name: 'status',
	category: 'Status',
	description: 'Used to check if bot it online and working.',
	aliases: ['s'],
	execute(message) {
		if(message.content === '!s') {
			return message.react('✅');
		}
		if(message.content == '!status') {
			return message.react('✅');
		}
	},
};