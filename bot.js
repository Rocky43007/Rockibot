const { CommandoClient } = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const Keyv = require('keyv');
const KeyvProvider = require('commando-provider-keyv');
const Canvas = require('canvas');
const logsdb = new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/logs.sqlite');

const client = new CommandoClient({
	commandPrefix: '!',
	owner: '361212545924595712',
	invite: 'https://discord.gg/Ju2gSCY',
});

client.on('messageDelete', async (message) => {
	const logs = await logsdb.get(message.guild.id);
	const embed = new discord.MessageEmbed()
		.setColor('#ff2050')
		.setAuthor(message.author.tag, message.author.avatarURL())
		.addField(`Message Deleted in #${message.channel.name}`, message.content)
		.setFooter(message.createdAt.toLocaleString());

	const sChannel = message.guild.channels.cache.find(c => c.name === logs);
	if (!sChannel) return;
	sChannel.send(embed);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
	const logs = await logsdb.get(oldMessage.guild.id);
	const embed = new discord.MessageEmbed()
		.setColor('#ff2050')
		.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
		.setDescription(`**Message edited in #${oldMessage.channel.name}**`)
		.addField('Before:', oldMessage.content, true)
		.addField('After:', newMessage.content, true)
		.setFooter(newMessage.createdAt.toLocaleString());

	const sChannel = newMessage.guild.channels.cache.find(c => c.name === logs);
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
		['music', 'Music commands'],
		['suggestions', 'Suggestion commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with !help | discord.gg/Ju2gSCY');
});

client.setProvider(new KeyvProvider(new Keyv('sqlite:///home/ricky/DiscordBotTest/databases/database.sqlite')));
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.login(process.env.TOKEN);