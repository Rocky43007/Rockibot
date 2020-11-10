const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var servers = {};
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
        run(message) {
	const intqueue = require('./play.js').extqueue;
	const intstream = require('./play.js').extstream;
	var server = servers[message.guild.id];
	if(intstream) intstream.end().then(
	message.channel.send('**Song skipped!**'));
	const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) {
                        const embed = new Discord.MessageEmbed()
                                .setColor('#c22419')
                                .setTitle('You need to be in a voice channel!')
                        return message.channel.send(embed);
               }
};
};

