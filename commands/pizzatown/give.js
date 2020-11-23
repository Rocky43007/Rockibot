const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
client1 = new Discord.Client();
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
const Advertiser = require('./models/Advertiser');
// We now have a giveawaysManager property to access the manager everywhere!
client1.giveawaysManager = manager;

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'give',
			group: 'pizzatown',
			memberName: 'give',
            description: 'Gives a user money',
            args:[
                {
                    key:'name',
                    prompt:'What is the of the user you want to give?',
                    type:'string'
                },
                {
                    key:'money',
                    prompt:'How much money do you want to give?',
                    type:'integer'
                }
               
            ],
            ownerOnly:true,
			guildOnly: true,
		});
	}
	async run(message, {name, money}) {
        Seller.findOne({name}).then(async user => {
           user.pizzaTokens+=money
           await user.save()
           message.reply("Money given.")
        }).catch(() => {
            Advertiser.findOne({name}).then(async user => {
                user.pizzaTokens+=money
                await user.save()
                message.reply("Money given.")
             }).catch(() => {
                 message.reply("This user does not exist.")
             })
        })
	}
};

