const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('../../config.js')
Client.login(config.token);
const moment = require('moment');
const os = require('os');
const { Command } = require('discord.js-commando');


module.exports = class stats extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'miscellaneous',
			memberName: 'stats',
			description: 'Bot stats',
		});
	}
	run(message) {
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		const totalGuilds = Client.guilds.cache.size;
		const totalMembers = Client.guilds.cache.reduce((p, c) => p + c.memberCount, 0);
		const totalChannels = Client.channels.cache.size;
		const totalShards = Client.options.shardCount;
		const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024), totalMemory = os.totalmem();
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
					.setTitle('Rockibot\'s Stats')
					.addField('Servers:', `${totalGuilds}`)
					.addField('Users:', `${totalMembers}`)
					.addField('Channels:', `${totalChannels}`)
					.addField('Shards:', `${totalShards} \`[ID: ${Client.shard.ids[0]}]\``)
					.addField('Creator:', 'Rocky43007#7727')
					.addField('Co-Developer:', 'Abdo#4056')
					.addField('Version:', '1.5.1-beta')
					.addField('Memory Usage:', `${getpercentage} (${used} MB)`)
					.addField('Uptime:', `${dateString}`)
					.addField('Discord.js Version:', 'v12.5.1')
					.addField('Operating System:', 'Ubuntu 18.04.5 LTS')
					.addField('Kernel:', `${os.release}`)
					.setTimestamp();

				return message.channel.send(embed);
	}
};

