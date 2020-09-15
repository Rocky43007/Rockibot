const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const logsdb = new Keyv(process.env.DATABASE_URL, { table: 'modlogs' });
const { Client2 } = require('pg');





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
		const client3 = new Client2({
			connectionString: process.env.DATABASE_URL,
			ssl: {
			  rejectUnauthorized: false
			}
		  });
		  
		  client3.connect();
		  
		  client3.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
			if (err) throw err;
			for (let row of res.rows) {
			  console.log(JSON.stringify(row));
			}
			client3.end();
		  });
		await logsdb.set(message.guild.id, logs).then(
			message.channel.send(`Successfully set mod log to \`${logs}\``),
		);
	}
};