const { Command } = require("discord.js-commando");
const ytdl = require("ytdl-core");
const db = require("quick.db");

module.exports = class MusicPlay extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      group: "music",
      memberName: "play",
      description: "Allows bot to play music for the user in a voice channel.",
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
      return message.reply("Please join a voice channel first!");
    }

    db.push(`queue_${message.guild.id}`, song);

    voiceChannel.join().then((connection) => {
      const stream = ytdl(song, { filter: "audioonly" });
      const dispatcher = connection.play(stream);
      dispatcher.on("finish", () => {
        db.set(
          `queue_${message.guild.id}`,
          db.all(`queue_${message.guild.id}`).slice(1)
        );
        db.all(`queue_${message.guild.id}`).forEach((song) => {
          const stream = ytdl(song, { filter: "audioonly" });
          const dispatcher = connection.play(stream);
          dispatcher.on("finish", () => {
            db.set(
              `queue_${message.guild.id}`,
              db.all(`queue_${message.guild.id}`).slice(1)
            );
          });
        });
      });
    });
  }
};
