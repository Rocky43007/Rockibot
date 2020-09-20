const { client } = require('discord.js');
const path = require('path');
const { token } = process.env.TOKEN

client.once('ready', () => {
	console.log('Ready!');
});

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with !help | discord.gg/Ju2gSCY');
});

client.login(token);