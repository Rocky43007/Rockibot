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
			\`v1.5.1-beta\` has been released!
			**Change Log:**
			1) New moderation updates! Now you won't need to type in channel names! Now you can do \`!modlog #logs\` and the bot will work! Even if you don't change to the channel id, the bot will still function as normal!
			2) New command! You can now do \`!echo\`! For example, \`!echo #general New command!\`. However, you will have to specify a channel for now, as I have not been able to have \`!echo <content>\` working straight away.
			3) XP and Leveling has been removed from the bot due to issues. It will be added soon in a bit. 
			4) New website revamp! Now you can visit https://rockibot.ml/commands to get a full list of commands and permission requirements!
			
			**Bugs that are being worked on:** 
			1) Pizza Town's is really buggy at some times.
			2) Music is wack as well. \`!play\` doesn't play anything.`)
			.setTimestamp();
		return message.channel.send(embed);
            // do what you need with lastMessage below
	}
};


