const { Command } = require('discord.js-commando');
const db = require('quick.db');


module.exports = class Warns extends Command {
	constructor(client) {
		super(client, {
			name: 'warns',
			group: 'moderation',
			memberName: 'warns',
			description: 'Used to check how many warns a user has.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to check?',
					type: 'user',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { user }) {
		if (!user) {
			return message.reply('Please specify a user.');
		}
		const warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);
		if(warnings === null) {
			message.say(`**${user.username}** has 0 warnings.`);
		}
		else {
			message.say(`**${user.username}** has ${warnings} warning(s).`);
		}
	}
};