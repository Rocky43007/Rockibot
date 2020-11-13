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
			.setDescription('Vote for Rockibot at Discord Bot List! Your vote means that Rockibot will get more coverage, so many other people can experience the bot for themselves!')
                        .setURL('https://discordbotlist.com/bots/rockibot/upvote');
                return message.channel.send(embed);
        }
};

