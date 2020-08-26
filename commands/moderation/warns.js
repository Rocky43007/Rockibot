const { Command } = require('discord.js-commando');
const fs = require('fs');
const warns = JSON.parse(fs.readFileSync('./databases/warning.json'));


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
		if (!warns[user.id]) {
			warns[user.id] = {
				warns: 0,
			};
		}
		const warnlevel = warns[user.id].warns;
		message.say(`${user.tag} has ${warnlevel} warning(s).`);
	}
};