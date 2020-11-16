const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));

module.exports = class Unmute extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'moderation',
			memberName: 'unmute',
			description: 'Used to unmute users.',
			clientPermissions: ['MANAGE_ROLES'],
<<<<<<< Updated upstream
			userPermissions: ['MANAGE_MESSAGES'],
=======
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
>>>>>>> Stashed changes
			args: [{
				key: 'user',
				label: 'user',
				prompt: 'Which user would you like to unmute? Please specify one only.',
				type: 'member',
			}],

			guildOnly: true,
		});
	}
	async run(message, { user }) {
		const uri = mconfig.URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });
	
		async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms = 0
		} = {}) {
			const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
			const cursor = client.db("Rockibot-DB").collection("modlogs")
				.find({
					guildname: { $gte: minimumNumberOfBedrooms }
				});
		
			const results = await cursor.toArray();
		
			if (results.length > 0) {
				const embed = new discord.MessageEmbed()
				.setColor('#ff2050')
				.setAuthor(`${message.guild.name}`, message.guild.iconURL())
				.addField('Moderation:', 'Unmute')
				.addField('Offender:', `**${user}**`)
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
					user.roles.remove(role.id).catch(console.error).then(
						user.send(`You have been unmuted from ${message.guild.name}.`),
						message.say(`**${user}** has been unmuted.`),
					);
				});
				cursor.close();
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
				cursor.close();
			}
		}
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Muted' role does not exist. Please create the 'Muted' role for the mute command.`);
		}
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to unmute.`);
		}
		if(user.roles.cache.has(role)) {
			return message.channel.send(`**${message.author.username}**, The user is already unmuted.`);
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
