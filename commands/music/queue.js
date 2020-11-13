const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
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

        db.all(`queue_${message.guild.id}`).forEach(song => message.channel.send(song));

	}	
};
