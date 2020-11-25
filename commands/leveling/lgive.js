const { Command } = require('discord.js-commando');
const leveling = require('discord-leveling')

module.exports = class level extends Command {
	constructor(client) {
		super(client, {
			name: 'givexp',
			group: 'leveling',
			memberName: 'givexp',
            description: 'Show\'s your level.',
            args: [
				{
					key: 'amount',
					prompt: 'How much xp do you want to add?',
					type: 'string',
                },
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
	async run(message, { amount, user }) {

		await leveling.SetXp(user.id, amount)
		message.channel.send(`${user.tag}! has ${amount} xp added.`);
        
    }
};


