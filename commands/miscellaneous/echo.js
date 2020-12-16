const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Echo extends Command {
	constructor(client) {
		super(client, {
			name: 'echo',
			group: 'miscellaneous',
			memberName: 'echo',
            description: 'Echo a message to another channel!',
userPermissions: ['MANAGE_MESSAGES'],
            args: [
				{
					key: 'channel',
					prompt: 'Which channel do you want to send the message to?',
					type: 'channel',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the message to be?',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	run(message, {channel, content}) {
        const sChannel = message.guild.channels.cache.find(c => c.id === channel.id);
        sChannel.send(content);
		
	}
};


