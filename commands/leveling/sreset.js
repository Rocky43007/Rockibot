const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const db = require('quick.db');

module.exports = class level extends Command {
	constructor(client) {
		super(client, {
			name: 'server-reset',
			group: 'leveling',
			memberName: 'server-reset',
            description: 'Resets a server.',
            guildOnly: true,
            ownerOnly: true,
		});
	}
	async run(message) {
        db.get(`messages_${message.guild.id}`);
        db.get(`level_${message.guild.id}`);
        db.delete(`messages_${message.guild.id}`);
        db.delete(`level_${message.guild.id}`);
        message.channel.send(`Reseted server.`)
        
    }
};

