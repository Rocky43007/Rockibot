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
            name: 'coin',
            group: 'pizzatown',
            memberName: 'coin',
            description: 'Flip a coin.',
            args: [
                {
                    key: 'face',
                    prompt: 'Do you want to bet on the coin lading on heads or tails?',
                    type: 'string',
                    oneOf:['heads', 'tails']
                },
                {
                    key: 'money',
                    prompt: 'How much money do you want to bet?',
                    type: 'integer'
                }

            ],
            guildOnly: false,
        });
    }
    async run(message, { face, money }) {
        Seller.findOne({ discord_id:message.author.id }).then(async user => {
            if(user.pizzaTokens < money){
                const membed = new Discord.MessageEmbed()
                    .setColor('ff0000')
                    .setTitle(`You have less than ${money}!`)
                message.channel.send(membed)
                return
            }
            if(Math.random()<0.5){
                user.pizzaTokens+=money;
                await user.save()
                const membed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`You won ${money}!`)
                message.channel.send(membed)
            }
            else{
                user.pizzaTokens-=money;
                await user.save()
                const membed = new Discord.MessageEmbed()
                    .setColor('ff0000')
                    .setTitle(`You lost ${money}!`)
                message.channel.send(membed)
            }
        }).catch(() => {
            Advertiser.findOne({ discord_id:message.author.id }).then(async user => {
                if(user.pizzaTokens < money){
                    const membed = new Discord.MessageEmbed()
                        .setColor('ff0000')
                        .setTitle(`You have less than ${money}!`)
                    message.channel.send(membed)
                    return
                }
                if(Math.random()<0.5){
                    user.pizzaTokens+=money;
                    await user.save()
                    const membed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(`You won ${money}!`)
                    message.channel.send(membed)
                }
                else{
                    user.pizzaTokens-=money;
                    await user.save()
                    const membed = new Discord.MessageEmbed()
                        .setColor('ff0000')
                        .setTitle(`You lost ${money}!`)
                    message.channel.send(membed)
                }
            }).catch(() => {
                const membed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`You do not have an account!`)
                message.channel.send(membed)
            })
        })
    }
};

