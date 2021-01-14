const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const Levels = require("discord-xp");

module.exports = class level extends Command {
	constructor(client) {
		super(client, {
			name: 'reset',
			group: 'leveling',
			memberName: 'rest',
            description: 'Resets an account.',
            args: [
                {
					key: 'user',
					prompt: 'Which user do you want to add XP to?',
					type: 'member',
                },
            ],
            guildOnly: true,
            ownerOnly: true,
		});
	}
	async run(message, { user }) {
	Levels.setXp(user.id, message.guild.id, 0);
	Levels.setLevel(user.id, message.guild.id, 0);
        message.channel.send(`Reseted ${user}'s account.`)
        
    }
};


