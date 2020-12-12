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
			name: 'accountdelete',
			group: 'pizzatown',
			memberName: 'accountdelete',
			description: 'Deletes your PizzaTown account.',
			guildOnly: false,
		});
	}
	async run(message) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
            await user.remove()
            message.reply("Your account has been deleted.")
        }).catch((err) => {
            Advertiser.findOne({discord_id:message.author.id}).then(async user => {
                await user.remove()
                message.reply("Your account has been deleted.")
			}).catch((err) => {
				console.log(err)
				message.reply("You don't have an account!")
			})
        })
	}
};


client1.login(require("../../config").token)