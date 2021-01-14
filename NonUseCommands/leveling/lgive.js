const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const Levels = require("discord-xp");

module.exports = class level extends Command {
	constructor(client) {
		super(client, {
			name: 'givexp',
			group: 'leveling',
			memberName: 'givexp',
            description: 'Show\'s your level.',
            args: [
	{
                                        key: 'user',
                                        prompt: 'Which user do you want to add XP to?',
                                        type: 'member',
                },
				{
					key: 'amount',
					prompt: 'How much XP should the user have?',
					type: 'integer',
                },
	{
                                        key: 'lamount',
                                        prompt: 'What level should the user be?',
                                        type: 'integer',
					default: '0',
                },
            ],
            guildOnly: true,
            ownerOnly: true,
		});
	}
	async run(message, { amount, user, lamount }) {

		Levels.setXp(user.id, message.guild.id, amount);
        Levels.setLevel(user.id, message.guild.id, lamount);
		message.channel.send(`${user.tag}! has ${amount} xp added.`);
        
    }
};


