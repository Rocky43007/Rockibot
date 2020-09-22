const { CommandoClient } = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const MongoDBProvider = require('commando-mongodb');
const Canvas = require('canvas');
const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;

const client = new CommandoClient({
	commandPrefix: '!',
	owner: '361212545924595712',
	invite: 'https://discord.gg/Ju2gSCY'
});

client.on('messageDelete', async (message) => {
	// create a client to mongodb
	const MongoClient = require('mongodb').MongoClient;
	const client2 = new MongoClient(uri, { useNewUrlParser: true });	
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
			.setAuthor(message.author.tag, message.author.avatarURL())
			.addField(`Message Deleted in #${message.channel.name}`, message.content)
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
	client2.connect(async err => {
		if (err) throw err;
		// db pointing to newdb
		console.log("Switched to "+client.databaseName+" database");
		// insert document to 'users' collection using insertOne
		client2.db("Rockibot-DB").collection("modlogs").find({ guildname: message.guild.id }, async function(err, res) {
			   if (err) throw err;
			   console.log("Document found");
			   await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
				minimumNumberOfBedrooms: message.guild.id
			});
			// close the connection to db when you are done with it
			client2.close();
		}); 
	});
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
	// create a client to mongodb
	const MongoClient = require('mongodb').MongoClient;
	const client2 = new MongoClient(uri, { useNewUrlParser: true });
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
			.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
			.setDescription(`**Message edited in #${oldMessage.channel.name}**`)
			.addField('Before:', oldMessage.content, true)
			.addField('After:', newMessage.content, true)
			.setFooter(newMessage.createdAt.toLocaleString());

			console.log(`Found document with guild id ${minimumNumberOfBedrooms}:`);
			results.forEach((result, i) => {
				console.log(`   _id: ${result._id}`);
				console.log(`   guildid: ${result.guildname}`);
				console.log(` 	channel name: ${result.channel}`)
				const logs = result.channel;
				const sChannel = oldMessage.guild.channels.cache.find(c => c.name === logs);
				if (!sChannel) return;
				sChannel.send(embed);
			});
		} else {
			console.log(`No Document has ${minimumNumberOfBedrooms} in it.`);
		}
	}
	client2.connect(async err => {
		if (err) throw err;
		// db pointing to newdb
		console.log("Switched to "+client.databaseName+" database");
		// insert document to 'users' collection using insertOne
		client2.db("Rockibot-DB").collection("modlogs").find({ guildname: oldMessage.guild.id }, async function(err, res) {
			   if (err) throw err;
			   console.log("Document found");
			   await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
				minimumNumberOfBedrooms: oldMessage.guild.id
			});
			// close the connection to db when you are done with it
			client2.close();
		}); 
	});
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Testing Commands'],
		['miscellaneous', 'Basic Commands'],
		['moderation', 'Moderation Commands'],
		['music', 'Music commands'],
		['suggestions', 'Suggestion commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
	
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with !help | discord.gg/Ju2gSCY');
});

client.setProvider(MongoClient.connect(uri, { useNewUrlParser: true }).then(client => new MongoDBProvider(client, 'Rockibot-DB')));
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.login(process.env.TOKEN); 