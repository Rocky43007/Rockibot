const Discord = require('discord.js');
const Client = new Discord.Client();
const moment = require('moment');
const os = require('os');

module.exports = {
	name: 'stats',
	group: 'miscellaneous',
	memberName: 'stats',
	description: 'Bot stats',
	execute(message) {
		const promises = [
			Client.shard.fetchClientValues('guilds.cache.size'),
			Client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
			Client.shard.fetchClientValues('channels.cache.size'),
			Client.shard.broadcastEval(`
			[
				this.shard.id,
			]
			`),
		];


		return Promise.all(promises)
			.then(results => {
				const used = process.memoryUsage().heapUsed / 1024 / 1024;
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
				const totalShards = results[3].reduce((acc, shardCount) => acc + shardCount, 0);
				const usedMemory = os.totalmem() - process.memoryUsage().heapUsed, totalMemory = os.totalmem();
				const getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + '%';
				const uptime = process.uptime();
				console.log('Uptime raw:', uptime);
				const date = new Date(uptime * 1000);
				const days = date.getUTCDate() - 1,
					hours = date.getUTCHours(),
					minutes = date.getUTCMinutes(),
					seconds = date.getUTCSeconds();
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
					.addField('Version:', '0.3.2-alpha')
					.addField('Memory Usage:', `${getpercentage} (${used} MB)`)
					.addField('Uptime:', `${dateString}`)
					.addField('Discord.js Version:', 'v12.3.1')
					.addField('Operating System:', 'Ubuntu 18.04.5 LTS')
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