const { Command } = require('discord.js-commando');



module.exports = class Dtest extends Command {
	constructor(client) {
		super(client, {
			name: 'dtest',
			group: 'first',
			memberName: 'dtest',
			description: 'Used to set the mod-log of the server.',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					key: 'logs',
					prompt: 'Which channel do you want to set as the mod-log? (Without the `#`)',
					type: 'string',
				},
			],
            guildOnly: true,
            ownerOnly: true,
		});
	}
	async run(message, { logs }) {
		// we create 'users' collection in newdb database
		const uri = process.env.MONGO_URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });

		// make client connect to mongo service
		client.connect(async err => {
            if (err) throw err;
            const cursor = client.db("Rockibot-DB").collection("modlogs").find({ guildname: message.guild.id });
            const results = await cursor.toArray();
            console.log(`ID: ${results._id}`);
            console.log(`Result: ${results.channel}`);
			client.close();
			}); 
		};
	};