const Discord = require('discord.js');
const Client = new Discord.Client();
const { Command } = require('discord.js-commando');

module.exports = class Invite extends Command {
	constructor(client) {
		super(client, {
            name: 'changelog',
            aliases: ['cl'],
			group: 'miscellaneous',
			memberName: 'changelog',
			description: 'Shows the latest changelog of the bot!',
		});
	}
	run(message) {
        const embed = new Discord.MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('Rockibot\'s Changelog!')
			.setDescription(`
			\`v1.5.5-beta\` has been released!
			**Change Log:**
			1) New moderation updates! You can now do \`!lock <channel>\` and \`!unlock <channel>\`! For example: \`!lock #general\`!
			
			**Bugs that are being worked on:** 
			1) Pizza Town's is really buggy at some times.
			2) Music is wack as well. \`!play\` doesn't play anything.`)
			.setTimestamp();
		return message.channel.send(embed);
            // do what you need with lastMessage below
	}
};



