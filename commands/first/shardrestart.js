const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Client = new Discord.Client();


module.exports = class shardsrestart extends Command {
        constructor(client) {
                super(client, {
                        name: 'restart',
                        group: 'first',
                        memberName: 'shardrestart',
                        description: 'Restart the shard',
                        ownerOnly: true,
			args: [{
                                key: 'shardid',
                                label: 'shardid',
                                prompt: 'Which shard would you like to restart?',
                                type: 'integer',
                        }],

                });
        }
        async run(message, { shardid }) {
	await message.channel.send(`Shard ${shardid} restarted!`).then(
	console.log(shardid),
	Client.shard.send(`restart ${shardid}`),
	);
        }
}; 
