const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");
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
            name: 'lookup',
            group: 'pizzatown',
            memberName: 'lookup',
            description: 'Looks up a PizzaTown users stats.',
            args: [
                {
                    key: 'name',
                    prompt: 'What is the account name of the user you want to look up?',
                    type:'string'
                }
            ],
			guildOnly: false,
        });
    }
    async run(message, {name}) {
        const formatSellers = sellerObjects => {
            let sellers = ''
            sellerObjects.forEach(seller => {
                sellers += `${seller.name} \n`
            })
            if(!sellers) return `They have no sellers!`
            return "```" + sellers + "```"
        }
        Seller.findOne({ name }).then(user => {
            let uprofit = 0;
			user.menu.forEach(pizza => {
				user.stores.forEach(store => {
					if(store.profitmultiplier===2){
						for(let i = 0; i < 2; i++){
							if(Math.round(Math.random()*100) > pizza.cost - user.reviewScore){
								if(pizza.cost / pizza.production < 3) uprofit += pizza.cost - pizza.production
							}
						}
					}
					if(store.profitmultiplier===3){
						for(let i = 0; i < 3; i++){
							if(Math.round(Math.random()*100) > pizza.cost - user.reviewScore){
								if(pizza.cost / pizza.production < 3) uprofit += pizza.cost - pizza.production
							}
						}
					}
					if(store.profitmultiplier===5){
						for(let i = 0; i < 5; i++){
							if(Math.round(Math.random()*100) > pizza.cost - user.reviewScore){
								if(pizza.cost / pizza.production < 3) uprofit += pizza.cost - pizza.production
							}
						}
					}
				})
			})
			uprofit+=15*user.bathrooms + 15
			uprofit+=5*user.sodaMachine + 5
			uprofit+=10*user.toppingBar + 10
			uprofit+=15*user.playPlace + 15
            const embed = new Discord.MessageEmbed()
                .setColor("#ccaaaa")
                .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
                .setAuthor(`${user.name}'s Stand.`, client1.users.cache.get(user.discord_id).displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    { name: "PizzaTokens", value: `${user.pizzaTokens}` },
                    {name:"Review Score", value:user.reviewScore},
                    { name: "Hourly Income", value: `Approx ${uprofit}` }
                )

            message.channel.send(embed)
        }).catch((err) => {
            Advertiser.findOne({ name }).then(user => {
                console.log(user)
                console.log(user.sellers)
                let uprofit = 0;
                uprofit+=15*user.offices + 15
                uprofit+=100*(user.offices2-1)
				uprofit+=5*user.airTime + 5
				uprofit+=10*user.tvChannels + 10
				uprofit+=15*user.employeeProduction + 15
                const embed = new Discord.MessageEmbed()
                    .setColor("#ccaaaa")
                    .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
                    .setAuthor(`${user.name}'s Stand.`, client1.users.cache.get(user.discord_id).displayAvatarURL({ format: "png", dynamic: true }))
                    .addFields(
                        { name: "PizzaTokens", value: `${user.pizzaTokens}` },
                        { name: "Sellers", value: formatSellers(user.sellers) },
                        { name:"Hourly Income", value:uprofit }
                    )
                message.channel.send(embed)
            }).catch((err) => {
                message.reply(`${name} does not exist!`)
            })
        })
    }
};


client1.login(require("../../config").token)