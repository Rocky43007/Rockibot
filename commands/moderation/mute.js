const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));

module.exports = class Mute extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			aliases: ['m'],
			group: 'moderation',
			memberName: 'mute',
			description: 'Used to mute users.',
			clientPermissions: ['MANAGE_ROLES'],
<<<<<<< Updated upstream
			userPermissions: ['MANAGE_MESSAGES'],
=======
			userPermissions: ['MANAGE_MESSAGES', 'MUTE_MEMBERS'],
>>>>>>> Stashed changes
			args: [{
				key: 'user',
				label: 'user',
				prompt: 'What user would you like to mute? Please specify one only.',
				type: 'member',
			},
			{
                                key: 'reason',
                                label: 'reason',
                                prompt: 'Why is the user being muted?',
                                type: 'string',
                                default: 'No Reason Given.'
                        },
			{
				key: 'time',
				label: 'time',
				prompt: 'How long will the user be muted for?',
				type: 'integer',
				default: '0',
			}],

			guildOnly: true,
		});
	}
	async run(message, { user, reason, time }) {
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
				.addField('Moderation:', 'Mute')
				.addField('Offender:', `**${user}**`)
				.addField('Reason:', reason)
				.addField('Duration', `${args} minute(s)`)
				.addField('Moderator:', `${message.author}`)
				.setTimestamp();
				const unmuteembed = new discord.MessageEmbed()
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
					if (args === '0') {
	                                   user.roles.add(role.id).catch(console.error).then(
	                                        user.send(`You have been muted from ${message.guild.name} indefinitely because of: ${reason}`),
	                                        message.say(`**${user}** has been muted indefinitely because of: ${reason}`),
 		                          );
					return;
                                	} else {
					 user.roles.add(role.id).catch(console.error).then(
                                        user.send(`You have been muted from ${message.guild.name} for ${args} minute(s) because of: ${reason}`),
                                        message.say(`**${user}** has been muted for ${args} minute(s) because of: ${reason}`),
                                	);
					}

					setTimeout(async () => {
						await user.roles.remove(role).then(
							sChannel.send(unmuteembed),
							user.send(`You have been unmuted from ${message.guild.name}.`),
						);
					}, args * 60000);
					cursor.close();
				});
			} else {
				console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
				cursor.close();
			}
		}
		const args = time;
		if(!message.member.hasPermission(['MANAGE_MESSAGES'])) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`);
		}
		const role = await message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!role) {
			return message.channel.send(`**${message.author.username}**, The 'Muted' role does not exist. Please create the 'Muted' role.`);
		}
		if(!user) {
			return message.channel.send(`**${message.author.username}**, You must specify a user to mute.`);
		}
		if(user.roles.cache.has(role)) {
			return message.channel.send(`**${message.author.username}**, The user is already muted.`);
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
