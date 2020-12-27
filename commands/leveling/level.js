const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const Levels = require("discord-xp");

module.exports = class level extends Command {
	constructor(client) {
		super(client, {
			name: 'level',
			group: 'leveling',
			memberName: 'level',
           		 description: 'Show\'s your level and xp.',
			guildOnly: true,
		});
	}
	async run(message) {
	const target = message.author; // Grab the target.

	const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.

	if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.

	const nl = user.level+1;
	const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle(`${message.author.username}'s Level`)
            .addField('Level:', user.level)
            .addField('XP:', user.xp)
	    .addField('Next Level:', `${Levels.xpFor(nl)} XP`)
        message.channel.send(embed);
   }
};


