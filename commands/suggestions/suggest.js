const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const db = require('quick.db');

module.exports = class Suggest extends Command {
	constructor(client) {
		super(client, {
			name: 'suggestion',
			aliases: ['suggest'],
			group: 'suggestions',
			memberName: 'suggest',
			description: 'Used to send a suggestion.',
			clientPermissions: ['ADMINISTRATOR', 'SEND_MESSAGES'],
			usage: '!suggest suggestion',
			args: [
				{
					key: 'suggest',
					prompt: 'What would you like to suggest?',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { suggest }) {

		const uri = process.env.MONGO_URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });
	
		async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms = 0
		} = {}) {
			const cursor = client.db("Rockibot-DB").collection("schanneldb")
				.find({
					guildname: { $gte: minimumNumberOfBedrooms }
				}).close();
		
			const results = await cursor.toArray();
		
			if (results.length > 0) {
				const casenumber = db.get(`casenumber_${message.guild.id}`);
				if(casenumber === null) {
					db.set(`casenumber_${message.guild.id}`, 1);
				}
				const embed = new discord.MessageEmbed()
				.setColor('#738ADB')
				.setAuthor(message.author.tag, message.author.avatarURL())
				.setTitle(`Suggestion #${casenumber}`)
				.setDescription(suggest);
				console.log(`Found document with guild id ${minimumNumberOfBedrooms}:`);
				results.forEach(async (result, i) => {
					console.log(`   _id: ${result._id}`);
					console.log(`   guildid: ${result.guildname}`);
					console.log(` 	channel name: ${result.channel}`)
					const logs = result.channel;
					const sChannel = message.guild.channels.cache.find(c => c.name === logs);
					if (!sChannel) return;
					const author = message.author.tag;
					const authorIM = message.author.avatarURL();
					message.reply(`Suggestion sent to ${sChannel}.`);
					sChannel.send({ embed: embed }).then(async embedMessage => {
						if(casenumber === null) {
							db.set(`casenumber_${message.guild.id}`, 1);
						}
						if(casenumber !== null) {
							db.add(`casenumber_${message.guild.id}`, 1);
						}
						embedMessage.react('⬆️').then(
						embedMessage.react('⬇️'));
						const client = new MongoClient(uri, { useNewUrlParser: true });
						client.connect(err => {
							const casenumber = db.get(`casenumber_${message.guild.id}`);
							if (err) throw err;
							// db pointing to newdb
							console.log("Switched to "+client.databaseName+" database");
				 
							// document to be inserted
							const doc = { messageid: embedMessage.id, author: author, authorim: authorIM, suggestion: suggest, suggestnum: casenumber };
					
							// insert document to 'users' collection using insertOne
							client.db("Rockibot-DB").collection("suggestdb").insertOne(doc, function(err, res) {
								   if (err) throw err;
								   console.log("Document inserted");
								// close the connection to db when you are done with it
								client.close();
							}); 
						});
					});
				});
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
			}
		}
		client.connect(async err => {
			if (err) throw err;
			// db pointing to newdb
			console.log("Switched to "+client.databaseName+" database");
			// insert document to 'users' collection using insertOne
			client.db("Rockibot-DB").collection("schanneldb").find({ guildname: message.guild.id }, async function(err, res) {
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
