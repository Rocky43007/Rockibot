const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sreset',
			group: 'first',
			memberName: 'sreset',
			description: 'Resets server suggestion number. [Owner Only]',
			ownerOnly: true,
		});
	}
	run(message) {
		const casenumber = db.get(`casenumber_${message.guild.id}`);
		db.set(`casenumber_${message.guild.id}`, 1);     
		message.say(`Suggestions for **${message.guild.name}** has been reset to **${casenumber}**!`); 
	}
}; 