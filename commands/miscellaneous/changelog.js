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
			description: 'Show\'s the latest changelog of the bot!',
		});
	}
	run(message) {
        const embed = new Discord.MessageEmbed()
			.setColor('#00FFFF')
			.setTitle('Rockibot\'s Changelog!')
			.setDescription(`
			\`v1.1.0-beta\` has been released!
			**Change Log:**
			1) You can now vote for the bot using \`!vote\`! <:rockibothappy:750764415401590926> 
			2) Addition of music commands again! Now with \`!queue\` and \`!skip\`! You can go add the music module via the dashboard by putting \`, music\` after either \`suggestions\`, \`moderation, suggestions\` or \`moderation\`!`)
			.setTimestamp();
		return message.channel.send(embed);
            // do what you need with lastMessage below
	}
};
