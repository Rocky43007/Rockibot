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
            name: 'dice',
            group: 'pizzatown',
            memberName: 'dice',
            description: 'Roll a dice.',
            guildOnly: false,
        });
    }
    async run(message) {
        Seller.findOne({ discord_id:message.author.id }).then(async user => {
            var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
            if(user.pizzaTokens < 300){
                const membed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`You have less than 300 PizzaTokens!`)
                message.channel.send(membed)
                return
            }
            if(x * 100>=300){
                const membed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`You earned ${x * 100 - 300} PizzaTokens!`)
                message.channel.send(membed)
            }
            else{
                const membed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`You lost ${300 - x * 100} PizzaTokens!`)
                message.channel.send(membed)
            }
            user.pizzaTokens += x * 100 - 300;
            await user.save()
        }).catch(() => {
            Advertiser.findOne({ discord_id:message.author.id }).then(async user => {
                var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
                if(user.pizzaTokens < 300){
                    const membed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(`You have less than 300 PizzaTokens!`)
                    message.channel.send(membed)
                    return
                }
                if(x*100>=300){
                    const membed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`You earned ${x * 100 - 300} PizzaTokens!`)
                    message.channel.send(membed)
                }
                else{
                    const membed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(`You lost ${300 - x * 100} PizzaTokens!`)
                    message.channel.send(membed)
                }
                user.pizzaTokens += x * 100 - 300;
                await user.save()
            }).catch(() => {
                const membed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`You do not have an account!`)
                message.channel.send(membed)
            })
        })
    }
};

