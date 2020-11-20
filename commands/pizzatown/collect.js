const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
const client = new Discord.Client();
const ms = require("ms");
const Advertiser = require('./models/Advertiser.js');
// We now have a giveawaysManager property to access the manager everywhere!


module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'collect',
			group: 'pizzatown',
			memberName: 'collect',
            description: 'Collect 10 PizzaTokens.',
			guildOnly: true,
		});
	}
	async run(message) {
		Seller.findOne({discord_id:message.author.id}).then(async user => {
            user.pizzaTokens += 10;
            await user.save()
            message.reply("Money collected.")
        }).catch((err) => {
            console.log(err)
            message.reply("You are not a seller!")
        })
	}
};

client.login(require("../../config").token)