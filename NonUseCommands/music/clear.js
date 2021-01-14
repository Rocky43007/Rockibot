const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const db=require("quick.db")

module.exports = class MusicJoin extends Command {
        constructor(client) {
                super(client, {
                        name: 'clear',
                        aliases: ['c'],
                        group: 'music',
                        memberName: 'clear',
                        description: 'Clears the server queue.',
                        guildOnly: true,
                });
        }
        async run(message) {
        const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
                        const embed = new Discord.MessageEmbed()
                                .setColor('#c22419')
                                .setTitle('You need to be in a voice channel!')
                        return message.channel.send(embed);
                }

        const connection=await voiceChannel.join();
        connection.disconnect()
        db.set(`queue_${message.guild.id}`, [])
        message.react("✅")
        }
};

