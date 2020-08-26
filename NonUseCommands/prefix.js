const Keyv = require('keyv');
const prefixes = new Keyv('sqlite:///home/ricky/DiscordBotTest/db.sqlite');
const { default_prefix } = require('/home/ricky/DiscordBotTest/config.json');
const globalPrefix = default_prefix;
const { Command } = require('discord.js-commando');

module.exports = class Prefix extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			aliases: ['p'],
			group: 'miscellaneous',
			memberName: 'prefix',
			description: 'Changes prefix of bot for the server.',
		});
	}
	async run(message, args) {
		// if there's at least one argument, set the prefix
		if (args.length) {
			await prefixes.set(message.guild.id, args[0]);
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}

		return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``).catch(console.error());
	}
};