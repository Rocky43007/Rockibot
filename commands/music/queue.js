const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var servers = {};
module.exports = class MusicQueue extends Command {
        constructor(client) {
                super(client, {
                        name: 'queue',
                        aliases: ['q'],
                        group: 'music',
                        memberName: 'queue',
                        description: 'Shows the music queue.',
                        guildOnly: true,
                });
        }
        run(message) {
		const intqueue = require('./play.js').extqueue;

		console.log(intqueue);
                if (message.channel.type === 'dm') return;
		var queue = `\`\`\`Next Song: ${intqueue}\`\`\``;
		const equeue = '```The queue is empty! Use !play to add a song!```';
		if (intqueue === undefined) {
		return message.channel.send(equeue)
		} else {
                return message.channel.send(queue);
		}
};
};

