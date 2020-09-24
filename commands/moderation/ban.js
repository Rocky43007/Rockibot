const discord = require('discord.js');
const { Command } = require('discord.js-commando');


module.exports = class Ban extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['b'],
			group: 'moderation',
			memberName: 'ban',
			description: 'Used to ban users. What did ya expect?',
			clientPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
			userPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to ban?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the ban message to be?',
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
				}).close()
		
			const results = await cursor.toArray();
		
			if (results.length > 0) {
				const embed = new discord.MessageEmbed()
				.setColor('#ff2050')
				.setAuthor(`${message.guild.name}`, message.guild.iconURL())
				.addField('Moderation:', 'Ban')
				.addField('Offender:', `**${user}**`)
				.addField('Reason:', content)
				.addField('Moderator:', `${message.author}`)
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
					user.send(`You have been banned from ${message.guild.name} for: ${content}`).then(function() {
						message.guild.member(user).ban();
						message.say('Successfully banned ' + user);
					});
				});
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
			}
		}
		if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not ban this user, he has higher permission than I do.');
		if (!message.guild.me.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) return message.reply('I need the permission `BAN_MEMBERS` for this to work.');

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