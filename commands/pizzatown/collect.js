const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");
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
            name: 'collect',
            group: 'pizzatown',
            memberName: 'collect',
            description: 'Collect 1% of your PizzaTokens',
            guildOnly: true,
		    throttling:{ 
                usages:1, 
                duration:300
            }
        });
    }
    async run(message) {
        Seller.findOne({ discord_id:message.author.id }).then(async user => {
            user.pizzaTokens += user.pizzaTokens/100
            await user.save()
            message.reply("Money collected.")
        }).catch(() => {
            Advertiser.findOne({ discord_id:message.author.id }).then(async user => {
                user.pizzaTokens += user.pizzaTokens/100
            await user.save()
            message.reply("Money collected.")
            }).catch(() => {
                const membed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`You do not have an account!`)
                message.channel.send(membed)
            })
        })
    }
};

