module.exports = {
	name: 'test',
	aliases: ['t'],
	description: 'Replies with a testing123 text piece. [Owner Only]',
	ownerOnly: true,
	execute(message) {
		return message.say('Testing 123.');
	},
};