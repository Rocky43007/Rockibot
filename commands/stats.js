const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const fs = require('fs');
const os = require('os');
const { datastore } = require('googleapis/build/src/apis/datastore');

module.exports = {
	name: 'stats',
	description: 'Server Stats',
	guildOnly: true,
	execute: async (message) => {
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
			client.shard.fetchClientValues('channels.cache.size'),
			client.shard.broadcastEval(`
			[
				this.shard.id,
			]
			`),
		];


		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
				const totalShards = results[3].reduce((acc, shardCount) => acc + shardCount, 0);
				const NumberOfFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).length;
				const usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();
				const getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + '%';
				const uptime = process.uptime();
				console.log('Uptime raw:', uptime);
				const date = new Date(uptime * 1000);
				const days = date.getUTCDate() - 1,
					hours = date.getUTCHours(),
					minutes = date.getUTCMinutes(),
					seconds = date.getUTCSeconds(),
					milliseconds = date.getUTCMilliseconds();
				const segments = [];
				if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
				if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
				if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
				if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
				const dateString = segments.join(', ');
				const embed = new Discord.MessageEmbed()
					.setColor('#00FFFF')
					.setTitle('Rocky\'s Modular Bot Stats')
					.addField('Servers:', `${totalGuilds}`)
					.addField('Users:', `${totalMembers}`)
					.addField('Channels:', `${totalChannels}`)
					.addField('Shard:', `${totalShards}`)
					.addField('Creator:', 'Rocky43007#7727')
					.addField('Version:', '0.0.1-Alpha')
					.addField('Number of Commands:', `${NumberOfFiles}`)
					.addField('Memory Usage:', `${getpercentage} (${(usedMemory / Math.pow(1024, 3)).toFixed(2)} GB)`)
					.addField('Uptime:', `${dateString}`)
					.addField('Discord.js Version:', 'v12.2.0')
					.addField('Operating System:', 'Ubuntu 20.04 LTS')
					.addField('Kernel:', `${os.release}`)
					.setFooter(moment().calendar(null, {
						sameDay: '[Today], LT',
						nextDay: '[Tomorrow]',
						nextWeek: 'dddd',
						lastDay: '[Yesterday], LT',
						lastWeek: '[Last] dddd, LT',
						sameElse: 'DD/MM/YYYY',
					}));

				return message.channel.send(embed);
			})

			.catch(console.error);
	},
};