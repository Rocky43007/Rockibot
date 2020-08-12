const Keyv = require('keyv');
const prefixes = new Keyv('sqlite:///home/ricky/DiscordBotTest/db.sqlite');
const { default_prefix } = require('/home/ricky/DiscordBotTest/config.json');
const globalPrefix = default_prefix;

module.exports = {
	name: 'prefix',
	category: 'Prefix',
	description: 'Used to change the prefix of the bot.',
	execute: async (message, args) => {
		// if there's at least one argument, set the prefix
		if (args.length) {
			await prefixes.set(message.guild.id, args[0]);
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}

		return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``);
	},
};