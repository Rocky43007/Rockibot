const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class unwarn extends Command {
	constructor(client) {
		super(client, {
			name: 'unwarn',
			aliases: ['removewarn'],
			group: 'moderation',
			memberName: 'unwarn',
			description: 'Used to unwarn users.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to unwarn?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the unwarn message to be?',
					type: 'string',
					default: 'No Reason Given',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { user, content }) {
		const uri = process.env.MONGO_URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });
	
		async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms = 0
		} = {}) {
			const cursor = client.db("Rockibot-DB").collection("modlogs")
				.find({
					guildname: { $gte: minimumNumberOfBedrooms }
				})
		
			const results = await cursor.toArray();
		
			if (results.length > 0) {
				const embed = new discord.MessageEmbed()
				.setColor('#ff2050')
				.setAuthor(`${message.guild.name}`, message.guild.iconURL())
				.addField('Moderation:', 'Unwarn')
				.addField('Offender:', `**${user}**`)
				.addField('Reason:', content)
				.addField('Moderator:', `${message.author}`)
				.addField('Warns:', warnings)
				.setFooter(message.createdAt.toLocaleString());
				console.log(`Found document with guild id ${minimumNumberOfBedrooms}:`);
				results.forEach((result, i) => {
					console.log(`   _id: ${result._id}`);
					console.log(`   guildid: ${result.guildname}`);
					console.log(` 	channel name: ${result.channel}`)
					const logs = result.channel;
					const sChannel = message.guild.channels.cache.find(c => c.name === logs);
					if (!sChannel) return;
					sChannel.send(embed);
				});
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
			}
		}
		if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You can\'t use that.');

		if (!message.guild.me.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.reply('I need the permission `MANAGE_MESSAGES` or `ADMINISTRATOR` for this to work.');

		if(!user) return message.reply('Please specify a user, via mention or ID.');

		if(user.bot) return message.reply('You can\'t unwarn bots.');

		if(message.author.id === user.id) return message.reply('You can\'t unwarn yourself.');

		if(message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not unwarn this user, he has a higher permission than I do.');


		const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === null) {
			await message.channel.send(`**${user.username}** has no warns to remove.`);
		}

		if(warnings !== null) {
			db.subtract(`warnings_${message.guild.id}_${user.id}`, 1);
			user.send(`You were warned in ${message.guild.name} for: ${content}`);
			await message.channel.send(`**${user.username}** has been unwarned.`);
		}
	}
};