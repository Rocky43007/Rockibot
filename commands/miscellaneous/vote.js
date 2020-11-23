const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class vote extends Command {
        constructor(client) {
                super(client, {
                        name: 'vote',
                        group: 'miscellaneous',
                        memberName: 'vote',
                        description: 'Used to vote for the bot!.',
                });
        }
        run(message) {
                const embed = new Discord.MessageEmbed()
                        .setColor('#00FFFF')
                        .setTitle('Vote for RockiBot!')
			.setDescription('Vote for Rockibot at Discord Bot List or Top.GG! Your vote means that Rockibot will get more coverage, so many other people can experience the bot for themselves!\n [Vote for Rockibot at Top.gg!](https://top.gg/bot/739923682075476089/vote)\n[Vote for Rockibot at Discord Bot List!](https://discordbotlist.com/bots/rockibot/upvote)')
                return message.channel.send(embed);
        }
};

