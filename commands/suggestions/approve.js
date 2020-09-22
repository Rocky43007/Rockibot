/* eslint-disable no-mixed-spaces-and-tabs */
const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const Keyv = require('keyv');
const schanneldb = new Keyv(process.env.MONGODB, { collection: 'schanneldb' });
const suggestdb = new Keyv(process.env.MONGODB, { collection: 'suggestdb' });
const suggestnum = new Keyv(process.env.MONGODB, { collection: 'suggestnum' });
const suggestuser = new Keyv(process.env.MONGODB, { collection: 'suggestuser' });
const suggestuserIM = new Keyv(process.env.MONGODB, { collection: 'suggestuserIM' });

module.exports = class SApprove extends Command {
	constructor(client) {
		super(client, {
			name: 'approve',
			aliases: ['accept'],
			group: 'suggestions',
			memberName: 'approve',
			description: 'Used to approve a suggestion.',
			clientPermissions: ['ADMINISTRATOR', 'SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'msgid',
					prompt: 'Which suggestion would you like to approve? (Use the message id)',
					type: 'string',
				},
				{
					key: 'comments',
					prompt: 'Any comments?',
					type: 'string',
					default: 'No comments given.',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { msgid, comments }) {
		const uri = process.env.MONGO_URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });
	
		async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms = 0,
			messid = 0
		} = {}) {
			const cursor = client.db("Rockibot-DB").collection("schanneldb")
				.find({
					guildname: { $gte: minimumNumberOfBedrooms }
				})
			const cursor2 = client.db("Rockibot-DB").collection("suggestdb")
				.find({
					messageid: { $gte: messid }
				})
		
			const results = await cursor.toArray();
			const res = await cursor2.toArray();
		
			if (results.length > 0 && res.length > 0) {
				console.log(`Found document with guild id ${minimumNumberOfBedrooms}:`);
				results.forEach(async (result, i) => {
					console.log(`   _id: ${result._id}`);
					console.log(`   guildid: ${result.guildname}`);
					console.log(` 	channel name: ${result.channel}`)
					const logs = result.channel;
					const sChannel = message.guild.channels.cache.find(c => c.name === logs);
					if (!sChannel) return;
					await sChannel.messages.fetch(msgid).then(msg =>
						res.forEach(async (res, i) => {
							console.log(`   _id: ${res._id}`);
							console.log(`   author: ${res.author}`);
							console.log(`   authorim: ${res.authorim}`);
							console.log(` 	suggestnum: ${res.suggestnum}`);
							console.log(`   suggestion: ${res.suggestion}`);
							const embed = new discord.MessageEmbed()
							.setColor('#71EEB8')
							.setAuthor(res.author, res.authorim)
							.setTitle(`Suggestion #${res.suggestnum} Approved`)
							.setDescription(res.suggestion)
							.addField(`Comment from ${message.author.tag}:`, comments);
							msg.edit(embed);
						}),
					);
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
					minimumNumberOfBedrooms: message.guild.id,
					messid: msgid
				});
				// close the connection to db when you are done with it
				client.close();
			}); 
		});
	}
};
