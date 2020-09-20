const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { token } = process.env.TOKEN

const client = new CommandoClient({
	commandPrefix: '!',
	owner: '361212545924595712',
	invite: 'https://discord.gg/Ju2gSCY',
});


client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Testing Commands'],
		['moderation', 'Moderation Commands'],
		['miscellaneous', 'Basic Commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with !help | discord.gg/Ju2gSCY');
});

client.login(token);