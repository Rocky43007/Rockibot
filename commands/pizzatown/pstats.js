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
			name: 'pstats',
			group: 'pizzatown',
			memberName: 'pstats',
			description: 'Shows your pizza town stats.',
			guildOnly: false,
		});
	}
	async run(message) {
		const formatSellers = sellerObjects => {
			let sellers=''
			sellerObjects.forEach(seller => {
				sellers += `${seller.name} \n`
			})
			if(!sellers) return `They have no sellers!`
			return "```"+sellers+"```"
		}
        Seller.findOne({discord_id:message.author.id}).then(user => {
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
            const embed=new Discord.MessageEmbed()
            .setColor("#ccaaaa")
            .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
            .setAuthor(`${user.name}'s Stand.`, message.author.displayAvatarURL({format:"png", dynamic:true}))
            .addFields(
                {name:"PizzaTokens", value:`${user.pizzaTokens}`},
                {name:"Stores", value:"Check your stores with !stores"},
				{name:"Menu", value:"Check your menu with !menu."},
				{name:"Review Score", value:user.reviewScore},
				{name:"Hourly Income", value:`Approx ${uprofit}`}
            )

            message.channel.send(embed)
        }).catch((err) => {
            Advertiser.findOne({discord_id:message.author.id}).then(user => {
				console.log(user)
				console.log(user.sellers)
				const embed=new Discord.MessageEmbed()
            .setColor("#ccaaaa")
            .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
            .setAuthor(`${user.name}'s Stand.`, message.author.displayAvatarURL({format:"png", dynamic:true}))
            .addFields(
                {name:"PizzaTokens", value:`${user.pizzaTokens}`},
				{name:"Sellers", value:formatSellers(user.sellers)}
			)
			message.channel.send(embed)
			}).catch((err) => {
				console.log(err)
				message.reply("You don't have an account!")
			})
        })
	}
};


client1.login(require("../../config").token)