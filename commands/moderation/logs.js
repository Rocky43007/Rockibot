const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv(process.env.MONGODB, { collection: 'modlogs' });
const MongoClient = require('mongodb').MongoClient;


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
		const doc = { guildid: `${message.guild.id}`, logchannel: `${logs}` };
		MongoClient.connect(process.env.MONGODB, function(err, db) {
			if (err) throw err; 
			db.collection('modlog').insertOne(doc, function(err, res) {
				if (err) throw err;
				message.channel.send(`Successfully set mod log to \`${logs}\``).then(
				db.close()); 
			});
	});
}
};