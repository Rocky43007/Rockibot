const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Dashboard extends Command {
        constructor(client) {
                super(client, {
                        name: 'dashboard',
			aliases: ['dash'],
                        group: 'miscellaneous',
                        memberName: 'dashboard',
                        description: 'Used to get the dashboard link.',
                });
        }
        run(message) {
                const embed = new Discord.MessageEmbed()
                        .setColor('#00FFFF')
                        .setTitle('Vist Rockibot\'s Dashboard!')
                        .setURL('http://rockibot.ml');
                return message.channel.send(embed);
        }
};


