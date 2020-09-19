const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv(process.env.MONGODB, { collection: 'modlogs' });



module.exports = class modlogs extends Command {
	constructor(client) {
		super(client, {
			name: 'modlog',
			group: 'moderation',
			memberName: 'modlogs',
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
		});
	}
	async run(message, { logs }) {
		// we create 'users' collection in newdb database
		const uri = process.env.MONGO_URI;
 
		// create a client to mongodb
		const MongoClient = require('mongodb').MongoClient;
		const client = new MongoClient(uri, { useNewUrlParser: true });

		// make client connect to mongo service
		client.connect(err => {
    		if (err) throw err;
    		// db pointing to newdb
    		console.log("Switched to "+client.databaseName+" database");
 
    		// document to be inserted
    		const doc = { guildname: message.guild.id, channel: logs };
    
    		// insert document to 'users' collection using insertOne
    		client.db("Rockibot-DB").collection("modlogs").insertOne(doc, function(err, res) {
       			if (err) throw err;
       			console.log("Document inserted");
				message.channel.send(`Successfully set mod log to \`${logs}\``);
        		// close the connection to db when you are done with it
				client.close();
			}); 
		});
	}
};