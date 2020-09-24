const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class help2 extends Command {
	constructor(client) {
		super(client, {
			name: 'newhelp',
			group: 'miscellaneous',
			memberName: 'newhelp',
			description: 'Shows the list of commands',
			args: [
				{
					key: 'page',
					prompt: 'Which page number would you like to go to?',
					type: 'integer',
					default: '0',
				},
			],
		});
	}
	run(message, page) {
		if (page === 1) {
			const basic = new Discord.MessageEmbed()
			.setColor('#4e03fc')
			.setTitle('Rockibot | General Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('help', 'Displays a list of available commands for Rockibot.')
			.addField('prefix', 'Display\'s the prefix of the bot on the server. To change, just do `!prefix <new prefix>`.')
			.addField('ping', 'See how fast the API reponse is between you and the bot.')
			.addField('status', 'Used to check if the bot is working or not.')
			.addField('stats', 'Nerdy stats for those who want to see who made the bot, and how much memory is being used, and what version the bot is.')
			.addField('invite', 'Allows other users to invite the bot to their own server.')
			message.channel.send(basic);
		}
		if (page === 2) {
			const mod = new Discord.MessageEmbed()
			.setColor('#ff2050')
			.setTitle('Rockibot | Moderation Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('ban', 'Bans users from the server. Usage: `!ban <Mention User or User ID> <Reason>`.')
			.addField('kick', 'Kicks users from the server. Usage: `!kick <Mention User or User ID> <Reason>`.')
			.addField('modlog', 'Sets the modeation log channel of the server. Usage: `!modlog <Channel Name without #>`.')
			.addField('mute', 'Used to mute members on the server. Usage: `!mute <Mention User or User ID> <Time> <Reason>`.')
			.addField('unmute', 'Un-mutes the mentioned muted user. Usage: `!unmute <Mention User or User ID>`.')
			.addField('purge', 'Used to remove specific number of messages on the server. Usage: `!purge <Number of messages>`.')
			.addField('warn', 'Allows staff to warn a member. Usage: `!warn <Mention User or User ID> <Reason>`.')
			.addField('unwarn', 'Allows staff to remove a warn from a member. Usage: `!unwarn <Mention User or User ID> <Reason>`.')
			.addField('warns', 'Allows staff to see how many warns a user has. Usage: `!warns <Mention User or User ID>`.')
			message.channel.send(mod);
		}
		if (page === 3) {
			const music = new Discord.MessageEmbed()
			.setColor('#2e77b8')
			.setTitle('Rockibot | Music Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('join', 'Makes the bot join the voice channel the user is in.')
			.addField('leave', 'Makes the bot leave the voice channel it was in.')
			.addField('play', 'Plays Youtube links in the voice channel. Usage: !play <Youtube link>.')
			.addField('pause', 'Pauses the music being played.')
			message.channel.send(music);
		}
		if (page === 4) {
			const suggestions = new Discord.MessageEmbed()
			.setColor('#2e77b8')
			.setTitle('Rockibot | Suggestions Commands')
			.setDescription('Please remove the `<>` when using the commands!')
			.addField('suggest-channel', 'Sets the channel where the suggestions will be found. Usage: `!suggest-channel <Suggestion Channel Name without #>`.')
			.addField('suggestion', 'Sends a suggestion to the suggestion channel. Usage: `!suggestion <Suggestion>`.')
			.addField('approve', 'Says that the suggestion is approved. Usage: `!approve <Suggestion Message ID> <Comments>`.')
			.addField('consider', 'Says that the suggestion is considered. Usage: `!consider <Suggestion Message ID> <Comments>`.')
			.addField('implement', 'Says that the suggestion is implemented. Usage: `!implement <Suggestion Message ID> <Comments>`.')
			.addField('deny', 'Says that the suggestion is denied. Usage: `!deny <Suggestion Message ID> <Comments>`.')
			message.channel.send(suggestions);
		}
		const home = new Discord.MessageEmbed()
		.setColor('#03d3fc')
		.setTitle('Rockibot | Help')
		.setDescription('Use `!help [page]` to switch pages!')
		.addField('Page 1: General Commands', 'These commands are given to everyone, and is the module that every user gets when they use the bot.')
		.addField('Page 2: Moderation Commands', 'These commands are for moderating servers, such as `!ban`, `!kick` and more!')
		.addField('Page 3: Music Commands', 'These commands are for the music aspect of the bot. Here, you can find information of `!play`, `!join` and more!')
		.addField('Page 4: Suggestion Commands', 'These commands relate to suggestions! Here, you can find information about `!suggest`, `!suggest-channel` and more!')
		message.channel.send(home);
	}
};