const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");
const GuideBot = require("../../bot");
const client = new Discord.Client();
// Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
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
client.giveawaysManager = manager;

module.exports = class gstart extends Command {
    constructor(client) {
        super(client, {
            name: 'officeauction',
            group: 'pizzatown',
            memberName: 'officeauction',
            description: 'Starts an office auction.',
            args: [
                {
                    key: 'baseBid',
                    prompt: 'What is the base bid?',
                    type: 'integer',
                }
            ],
            ownerOnly:true
        });
    }
    async run(message, { baseBid }) {
        const amount = Math.round(Math.random() * 10)
        client.channels.cache.get("790205618731352085").send(`Hey! I am selling ${amount} offices with a base bid of ${baseBid} PizzaTokens! I will buy from the person who gives me the highest discount! Auction time!`).then(botMessage => {
            const bid = {user:null, money:baseBid};
            const filter = m => !isNaN(m.content)
            const collector = botMessage.channel.createMessageCollector(filter, { time:120000 })

            collector.on("collect", async m => {
                const advertiser = await Advertiser.findOne({discord_id:m.author.id})
                if(!await Advertiser.findOne({discord_id:m.author.id})){
                    m.reply("You are not an advertiser!")
                }
                else if(Number(m.content)<=bid.money){
                    m.reply("You must bid higher than "+bid.money+"!")
                }
                else if(Number(m.content)>advertiser.pizzaTokens){
                    m.reply("You don't have more than "+m.content+" PizzaTokens!")
                }
                else if(bid.user===m.author.id){
                    m.reply("You already have the highest bid!")
                }
                else{
                    bid.money = Number(m.content)
                    bid.user = m.author.id
                    m.reply("The highest bid is now "+bid.money+" from "+client.users.cache.get(bid.user).tag+"!")
                }
            })

            collector.on("end", async () => {
                if(bid.user===null){
                    client.channels.cache.get("790205618731352085").send(`Looks like there were no bidders, that is quite sad.`)
                }
                else{
                    client.channels.cache.get("790205618731352085").send(`The auction is over! The winner was ${client.users.cache.get(bid.user).tag} buying ${amount} offices for ${bid.money}!`)
                    const advertiser = await Advertiser.findOne({discord_id:discount.user});
                    advertiser.offices2 += amount;
                    await advertiser.save()
                }
            })
        })
    }
};


client.login(require("../../config").ptoken)