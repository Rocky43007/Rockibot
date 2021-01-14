const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();
const Levels = require("discord-xp");

module.exports = class lb extends Command {
	constructor(client) {
		super(client, {
            name: 'leaderboard',
            aliases: ['lb'],
			group: 'leveling',
			memberName: 'lb',
            description: 'Shows the server\'s XP Leaderboard.',
			guildOnly: true,
		});
	}
	async run(message) {
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
 
const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
//${lb.join("\n\n")}

	const embed = new Discord.MessageEmbed()
	 .setTitle(`${message.guild.name}'s Leaderboard`)
	 .setDescription(`${lb.join("\n\n")}`);
	message.channel.send(embed);
    }
};


