const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
const client1 = new Discord.Client();
// Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client1, {
	storage: "./giveaways.json",
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		embedColor: "#44ff00",
		embedColorEnd: "#d61818",
		reaction: "🎉"
	}
});
const ms = require("ms");
const Advertiser = require('./models/Advertiser.js');
// We now have a giveawaysManager property to access the manager everywhere!
client1.giveawaysManager = manager;

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'pstart',
			group: 'pizzatown',
			memberName: 'pstart',
			description: 'Starts your pizza town journey.',
			args: [
				{
					key: 'name',
					prompt: 'What is your shack or advertiser name?',
					type: 'string',
					min:1,
					max:30
				}
			],
			guildOnly: false,
		});
	}
	async run(message, { name }) {
		const sellers = await Seller.find()
		const advertisers = await Advertiser.find()
		if(await Advertiser.findOne({discord_id:message.author.id}) || await Seller.findOne({discord_id:message.author.id})){
			message.channel.send("You already have an account!")
			return
		}
		const filter = (reaction, user) => {
			return ['📺', '🍕'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
		message.author.send("Would you like to be a TV advertiser or Pizza Seller? You have 15 minutes.").then(botMessage => {
			botMessage.react("📺")
			botMessage.react("🍕")
			botMessage.awaitReactions(filter, { max: 1, time: 90000, errors: ['time'] })
				.then(async collected => {
					const reaction = collected.first();

					console.log(reaction.emoji.name)
					if(sellers.find(seller => seller.name === name) || advertisers.find(advertiser => advertiser.name === name)){
						message.channel.send("That name is already in use!")
					}
					else if(reaction.emoji.name === '🍕'){
						const seller = new Seller({name, discord_id:message.author.id})
						seller.save().then(() => {
							message.author.send(`You have created a pizza stand named ${name}! Now you can add pizza to your menu with !menu.`);
						})
					}
					else {
						const advertiser = new Advertiser({name, discord_id:message.author.id})
						console.log(advertiser)
						advertiser.save().then(() => {
							message.author.send(`You have created a TV channel named ${name}! Now you can start looking for stands to advertise in with !lookforstands.`);
						})
					}
				})
				.catch(collected => {
					message.author.send('You did not react with a tv or pizza.');
				});
		})
	}
};


client1.login(require("../../config.js").token)