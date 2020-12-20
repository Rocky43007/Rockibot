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
            name: 'pizzadiscountauction',
            group: 'pizzatown',
            memberName: 'pizzadiscountauction',
            description: 'Starts a pizza auction.',
            args: [
                {
                    key: 'pizzas',
                    prompt: 'How many pizzas will the customer buy?',
                    type: 'integer',
                }
            ],
            ownerOnly:true
        });
    }
    async run(message, { pizzas }) {
        client.channels.cache.get("781214583393615903").send(`Hey <@Auction>! I want to buy ${pizzas} pizzas costing ${pizzas * 12} PizzaTokens! I will buy from the person who gives me the highest discount! Auction time!`).then(botMessage => {
            const discount = {user:null, money:0};
            const filter = m => !isNaN(m.content)
            const collector = botMessage.channel.createMessageCollector(filter, { time:120000 })

            collector.on("collect", async m => {
                const seller = await Seller.findOne({discord_id:m.author.id})
                console.log(Number(m.content), m.author.id, seller)
                if(!await Seller.findOne({discord_id:m.author.id})){
                    m.reply("You are not a seller!")
                }
                else if(Number(m.content)<=discount.money){
                    m.reply("You must bid higher than "+discount.money+"!")
                }
                else if(Number(m.content)>seller.pizzaTokens){
                    m.reply("You don't have more than "+m.content+" PizzaTokens!")
                }
                else if(discount.user===m.author.id){
                    m.reply("You already have the highest bid!")
                }
                else if(Number(m.content)>=pizzas * 12){
                    m.reply("You must bid lower than "+pizzas * 12+"!")
                }
                else{
                    discount.money = Number(m.content)
                    discount.user = m.author.id
                    m.reply("The highest bid is now "+discount.money+" from "+client.users.cache.get(discount.user).tag+"!")
                }
            })

            collector.on("end", async () => {
                if(discount.user===null){
                    client.channels.cache.get("781214583393615903").send(`Looks like there were no bidders, that is quite sad.`)
                }
                else{
                    client.channels.cache.get("781214583393615903").send(`The auction is over! The winner was ${client.users.cache.get(discount.user).tag} selling ${pizzas} pizzas with a ${discount.money} discount earning ${pizzas * 12 - discount.money}!`)
                    const seller = await Seller.findOne({discord_id:discount.user});
                    seller.pizzaTokens += pizzas * 12 - discount.money;
                    await seller.save()
                }
            })
        })
    }
};


client.login(require("../../config").ptoken)