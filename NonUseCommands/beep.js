module.exports = {
	name: 'beep',
	description: 'Beep makes Boop!',
	execute(message, args) {
		message.channel.send('Boop.');
	},
};