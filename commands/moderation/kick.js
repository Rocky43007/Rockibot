const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));

module.exports = class Kick extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			aliases: ['k'],
			group: 'moderation',
			memberName: 'kick',
			description: 'Used to kick users. What did ya expect?',
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to kick?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the kick message to be?',
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
				.addField('Moderation:', 'Kick')
				.addField('Offender:', `**${user}**`)
				.addField('Reason:', content)
				.addField('Moderator:', `${message.author}`)
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
					user.send(`You have been kicked from ${message.guild.name} for: ${content}`).then(function() {
						message.guild.member(user).kick();
						message.say('Successfully kicked ' + user.tag);
					});
					cursor.close();
				});
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
				cursor.close();
			}
		}

		if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not ban this user, he has higher permission than I do.');
		if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I need the permission `KICK_MEMBERS` for this to work.');
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

