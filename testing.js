const { CommandoClient } = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const { token } = require('./config.json');
const Keyv = require('keyv');
const KeyvProvider = require('commando-provider-keyv');

const client = new CommandoClient({
	commandPrefix: '!',
	owner: '361212545924595712',
	invite: 'https://discord.gg/Ju2gSCY',
});

client.on('messageDelete', async (message) => {
	const embed = new discord.MessageEmbed()
		.setColor('#ff2050')
		.setAuthor(message.author.tag, message.author.avatarURL())
		.addField(`Message Deleted in #${message.channel.name}`, message.content)
		.setFooter(message.createdAt.toLocaleString());

	const sChannel = message.guild.channels.cache.find(c => c.name === 'mod-log');
	if (!sChannel) return;
	sChannel.send(embed);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
	const embed = new discord.MessageEmbed()
		.setColor('#ff2050')
		.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
		.setDescription(`**Message edited in #${oldMessage.channel.name}**`)
		.addField('Before:', oldMessage.content, true)
		.addField('After:', newMessage.content, true)
		.setFooter(newMessage.createdAt.toLocaleString());

	const sChannel = newMessage.guild.channels.cache.find(c => c.name === 'mod-log');
	if (!sChannel) return;
	sChannel.send(embed);
});
client.on('message', async m => {
	m.isDM = (m.guild ? false : true);
	if (m.content[0] != client.commandPrefix) {
		return;
	}
	else if (m.channel.name === 'general') {
		m.delete().then(
			m.reply('**You can\'t use commands here!**'));
	}
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

client.setProvider(new KeyvProvider(new Keyv('sqlite:///home/ricky/DiscordBotTest/database.sqlite')));

client.login(token);