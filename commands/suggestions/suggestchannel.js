const { Command } = require('discord.js-commando');

module.exports = class suggestionchannel extends Command {
	constructor(client) {
		super(client, {
			name: 'suggest-channel',
			group: 'suggestions',
			memberName: 'suggest-channel',
			description: 'Used to set the suggestion channel for the server.',
			clientPermissions: ['ADMINISTRATOR', 'MANAGE_CHANNELS'],
			userPermissions: ['ADMINISTRATOR'],
			usage: '!suggest-channel channel-name',
			args: [
				{
					key: 'suggestchannel',
					prompt: 'Which channel do you want to set as the suggestion channel? (Without the \'#\')',
					type: 'string',
				},
			],
			guildOnly: true,
		});
	}
	async run(message, { suggestchannel }) {
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
    		const doc = { guildname: message.guild.id, channel: suggestchannel };
    
    		// insert document to 'users' collection using insertOne
    		client.db("Rockibot-DB").collection("schanneldb").insertOne(doc, function(err, res) {
       			if (err) throw err;
       			console.log("Document inserted");
				message.channel.send(`Successfully set suggestion channel to \`${suggestchannel}\``);
        		// close the connection to db when you are done with it
				client.close();
			}); 
		});
	}
};
