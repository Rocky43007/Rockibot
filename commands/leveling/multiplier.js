const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const db = require('quick.db');

module.exports = class level extends Command {
        constructor(client) {
                super(client, {
                        name: 'levelmulti',
                        group: 'leveling',
                        memberName: 'levelmulti',
                        description: 'Adds a multiplier to a specific chat.',
                        userPermissions: ['ADMINISTRATOR'],
			            args: [
				            {
					            key: 'logs',
					            prompt: 'Which channel do you want to have a multiplier?',
					            type: 'channel',
                            },
                            {
					            key: 'multiplier',
					            prompt: 'What\'s the multiplier?',
					            type: 'integer',
						    default: 1,
				            }
			            ],
                        guildOnly: true,
                });
        }
        async run(message, { logs, multiplier }) {
            const multidb = db.get(`xpmulti_${logs.id}`);
            if(multidb === null) {
                db.set(`xpmulti_${logs.id}`, multiplier);
                const embed = new Discord.MessageEmbed()
                .setDescription(`✅ ${logs} has now a multipler of ${multiplier}.`)
                message.channel.send(embed);
            };
            if(multidb !== null) {
                db.set(`xpmulti_${logs.id}`, multiplier);
                const embed = new Discord.MessageEmbed()
                .setDescription(`✅ ${logs} has now a multipler of ${multiplier}.`)
                message.channel.send(embed);
            }
        }
};



