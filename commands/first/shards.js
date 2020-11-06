const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Client = new Discord.Client();


module.exports = class shards extends Command {
        constructor(client) {
                super(client, {
                        name: 'shards',
                        group: 'first',
                        memberName: 'shards',
                        description: 'Replies with the shard status',
                        ownerOnly: true,
                });
        }
        async run(message) {
		const values = await Client.shard.broadcastEval(`
    		[
        		this.shard.ids[0],
        		this.guilds.cache.size
    		]
		`);
		let finalString = "**SHARD STATUS**\n\n";
		values.forEach((value) => {
    		// Add the shard infos to the final string
    		finalString += "SHARD #"+value[0]+" | Server Count: "+value[1]+"\n";
		});
		return message.channel.send(finalString);
	}
}; 

