const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const leveling = require('discord-leveling');
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
        const output = await leveling.Fetch(message.author.id);

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle(`${message.author.username}'s Level`)
            .addField('Level:', output.level)
            .addField('XP:', output.xp)
        message.channel.send(embed);
    }
};


