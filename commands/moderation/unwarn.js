const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const db = require('quick.db');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));

module.exports = class unwarn extends Command {
	constructor(client) {
		super(client, {
			name: 'unwarn',
			aliases: ['removewarn'],
			group: 'moderation',
			memberName: 'unwarn',
			description: 'Used to unwarn users.',
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
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
		const uri = mconfig.URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });
	
		async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms = 0
		} = {}) {
			const cursor = client.db("Rockibot-DB").collection("modlogs")
				.find({
					guildname: { $gte: minimumNumberOfBedrooms }
				});
		
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
				.setTimestamp();
				console.log(`Found document with guild id ${minimumNumberOfBedrooms}:`);
				results.forEach((result, i) => {
					console.log(`   _id: ${result._id}`);
					console.log(`   guildid: ${result.guildname}`);
					console.log(` 	channel name: ${result.channel}`)
					const logs = result.channel;
					try {
						const sChannel = message.guild.channels.cache.find(c => c.name === logs);
						sChannel.send(embed);
					}
					catch(err) {
						const sChannel = message.guild.channels.cache.find(c => c.id === logs);
						if (!sChannel) return;
						sChannel.send(embed);
					}
				});
				cursor.close();
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
				cursor.close();
			}
		}
		if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You can\'t use that.');

		if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I need the permission `MANAGE_MESSAGES` or `ADMINISTRATOR` for this to work.');

		if(!user) return message.reply('Please specify a user, via mention or ID.');

		if(user.bot) return message.reply('You can\'t unwarn bots.');

		if(message.author.id === user.id) return message.reply('You can\'t unwarn yourself.');

		if(message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not unwarn this user, he has a higher permission than I do.');


		const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === null) {
			await message.channel.send(`**${user.tag}** has no warns to remove.`);
		}
		if(warnings === 0) {
			await message.channel.send(`**${user.tag}** has no warns to remove.`);
		}

		if(warnings !== null) {
			db.subtract(`warnings_${message.guild.id}_${user.id}`, 1);
			user.send(`You were warned in ${message.guild.name} for: ${content}`);
			await message.channel.send(`**${user.tag}** has been unwarned.`);
		}
		client.connect(async err => {
			if (err) throw err;
			// db pointing to newdb
			console.log("Switched to "+client.databaseName+" database");
			// insert document to 'users' collection using insertOne
			client.db("Rockibot-DB").collection("modlogs").find({ guildname: message.guild.id }, async function(err, res) {
				   if (err) throw err;
				   console.log("Document found");
				   await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
					minimumNumberOfBedrooms: message.guild.id
				});
				// close the connection to db when you are done with it
				client.close();
			}); 
		});
	}
};

