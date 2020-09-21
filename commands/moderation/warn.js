const discord = require('discord.js');
const { Command } = require('discord.js-commando');
const ms = require('ms');
const db = require('quick.db');


module.exports = class Warn extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			aliases: ['w'],
			group: 'moderation',
			memberName: 'warn',
			description: 'Used to warn users.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			userPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to warn?',
					type: 'user',
				},
				{
					key: 'content',
					prompt: 'What would you like the content of the warn message to be?',
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
				const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
				const embed = new discord.MessageEmbed()
				.setColor('#ff2050')
				.setAuthor(`${message.guild.name}`, message.guild.iconURL())
				.addField('Moderation:', 'Warn')
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

		if(user.bot) return message.reply('You can\'t warn bots.');

		if(message.author.id === user.id) return message.reply('You can\'t warn yourself.');

		if(message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply('I can not warn this user, he has a higher permission than I do.');


		const warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

		if(warnings === 3) {
			const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
			if (!muterole) return message.reply('Create the `Muted` role.');

			const mutetime = '10s';
			await (user.roles.add(muterole.id));
			message.channel.send(`**${user.tag}** has been temporarily muted.`);
			setTimeout(function() {
				user.roles.remove(muterole.id);
				message.channel.reply(`**${user.tag}** has been unmuted.`);
			}, ms(mutetime));
		}

		if(warnings === null) {
			db.set(`warnings_${message.guild.id}_${user.id}`, 1);
			user.send(`You were warned in ${message.guild.name} for: ${content}`);
			await message.channel.send(`**${user.username}** has been warned.`);
		}

		if(warnings !== null) {
			db.add(`warnings_${message.guild.id}_${user.id}`, 1);
			user.send(`You were warned in ${message.guild.name} for: ${content}`);
			await message.channel.send(`**${user.username}** has been warned.`);
		}

			// make client connect to mongo service
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