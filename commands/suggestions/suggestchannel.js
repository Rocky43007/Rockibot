const { Command } = require('discord.js-commando');
const Keyv = require('keyv');
const schannel = new Keyv(process.env.HEROKU_POSTGRESQL_CRIMSON_URL);

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
		await schannel.set(message.guild.id, suggestchannel).then(
			message.channel.send(`Successfully set suggestion channel to \`${suggestchannel}\``),
		);
	}
};
