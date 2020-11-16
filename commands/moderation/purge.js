const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));

module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'moderation',
			memberName: 'purge',
			description: 'Purges the Chat',
			clientPermissions: ['MANAGE_MESSAGES'],
<<<<<<< Updated upstream
			userPermissions: ['ADMINISTRATOR'],
=======
			userPermissions: ['MANAGE_MESSAGES'],
>>>>>>> Stashed changes
			args: [
				{
					key: 'purgecount',
					prompt: 'How many messages should I purge??',
					type: 'integer',
				},
			],
			guildOnly: true,
		});
	}

	async run(message, args) {
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
				await message.channel.messages
				.fetch({ limit: args.purgecount})
				.then(async messages => {
				// Fetches the messages
				await message.channel.bulkDelete(messages);
				})
				.then(() => {
				message
					.reply(`Sucessfully Deleted ${args.purgecount} messages.`)
					.then(message.channel.bulkDelete(1));
				});
				const embed = new discord.MessageEmbed()
				.setColor('#ff2050')
				.setAuthor(`${message.guild.name}`, message.guild.iconURL())
				.addField('Moderation:', 'Purge')
				.addField('Amount of text purged:', args.purgecount)
				.addField('Moderator:', `${message.author}`)
				.setTimestamp();
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
				cursor.close();
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
				cursor.close();
			}
		}
		// Purge Command!
		if (message.author.bot) return;
		if (args.purgecount > 100) {
			return message.reply(
				'You can only purge up to 100 messages at a time.',
			);
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
