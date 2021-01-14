const { Command } = require("discord.js-commando");
const ytdl = require("ytdl-core");
const db = require("quick.db");
const Discord = require('discord.js');

module.exports = class MusicPlay extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      group: "music",
      memberName: "play",
      description: "Allows bot to play music for the user in a voice channel.",
      clientPermissions: ['SPEAK'],
      args: [
        {
          key: "song",
          prompt: "What song would you like to listen to?",
          type: "string",
        },
      ],
      guildOnly: true,
    });
  }
  run(message, { song }) {
    if (message.channel.type === "dm") return;

    const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
                        const embed = new Discord.MessageEmbed()
                                .setColor('#c22419')
                                .setTitle('You need to be in a voice channel!')
                        return message.channel.send(embed);
                }

    console.log(db.get(`queue_${message.guild.id}`))

    if(!db.get(`queue_${message.guild.id}`)) db.set(`queue_${message.guild.id}`, [])
 
    if (db.get(`queue_${message.guild.id}`).length === 0) {
      db.push(`queue_${message.guild.id}`, song);
      voiceChannel.join().then((connection) => {
        const stream = ytdl(song, { filter: "audioonly" });
        const dispatcher = connection.play(stream);
        dispatcher.on("finish", () => {
          db.set(
            `queue_${message.guild.id}`,
            db.get(`queue_${message.guild.id}`).slice(1)
          );
          db.get(`queue_${message.guild.id}`).forEach((song) => {
            const stream = ytdl(song, { filter: "audioonly" });
            const dispatcher = connection.play(stream);
            dispatcher.on("finish", () => {
              db.set(
                `queue_${message.guild.id}`,
                db.get(`queue_${message.guild.id}`).slice(1)
              );
            });
          });
        });
      });
    }
    else{
      console.log(db.get(`queue_${message.guild.id}`))
      db.push(`queue_${message.guild.id}`, song);
      message.channel.send("Song added to the queue!")
    }
  }
};
