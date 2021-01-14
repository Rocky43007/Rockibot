const { Command } = require('discord.js-commando');
const db = require("quick.db");
const getTitleAtUrl=require("get-title-at-url")

module.exports = class MusicPlay extends Command {
        constructor(client) {
                super(client, {
                        name: 'queue',
                        aliases: ['q'],
                        group: 'music',
                        memberName: 'queue',
                        description: "The server's music queue.",
                        guildOnly: true,
                });
        }
        run(message) {
                if(!db.get(`queue_${message.guild.id}`)){
                        message.channel.send("The queue is empty!")
                        return
                }
        db.get(`queue_${message.guild.id}`).slice(0, 5).forEach((song) => {
                        getTitleAtUrl(song, title => {
                                message.channel.send(title)
                        })
                })
                

        }       
};

