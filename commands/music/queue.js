const { Command } = require('discord.js-commando');
const db=require("quick.db");

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
                
                let songs=''
        db.get(`queue_${message.guild.id}`).forEach((song) => {
                        console.log(song)
                        songs += `${song} \n`
                })
                console.log(db.get(`queue_${message.guild.id}`))
                if(!songs){
                        message.channel.send("Queue is empty!")
                        return
                }

                message.channel.send("```" + songs + "```")

        }       
};

