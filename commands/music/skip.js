const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const db = require("quick.db")
const ytdl = require("ytdl-core");
module.exports = class MusicSkip extends Command {
        constructor(client) {
                super(client, {
                        name: 'skip',
                        group: 'music',
                        memberName: 'skip',
                        description: 'Skips to the next song.',
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
                const connection = await message.member.voice.channel.join()
                message.react("✅")
                db.set(`queue_${message.guild.id}`, db.get(`queue_${message.guild.id}`))
                if(!db.get(`queue_${message.guild.id}`).slice(1)) await connection.disconnect()
                db.get(`queue_${message.guild.id}`).slice(1).forEach((song) => {
                        const stream = ytdl(song, { filter: "audioonly" });
                        const dispatcher = connection.play(stream);
                        dispatcher.on("finish", () => {
                                db.set(
                                        `queue_${message.guild.id}`,
                                        db.get(`queue_${message.guild.id}`).slice(2)
                                );
                        });
                });
        }
};
