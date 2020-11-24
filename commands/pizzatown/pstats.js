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

			return "```"+sellers+"```"
		}
        Seller.findOne({discord_id:message.author.id}).then(user => {
			let uprofit = 0;
			user.menu.forEach(pizza => {
				let sales = 0;

				sales += pizza.production * 20

				sales -= pizza.cost * 5

				let profit = (sales * pizza.production / 2) / pizza.production;

				uprofit += Math.round(profit)
			})
			let profitmultiplier = 0;
			user.stores.forEach(store => {
				profitmultiplier += store.profitmultiplier
			})
			uprofit *= Math.round(profitmultiplier / 3)
            const embed=new Discord.MessageEmbed()
            .setColor("#ccaaaa")
            .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
            .setAuthor(`${user.name}'s Stand.`, message.author.displayAvatarURL({format:"png", dynamic:true}))
            .addFields(
                {name:"PizzaTokens", value:`${user.pizzaTokens}`},
                {name:"Stores", value:"Check your stores with !stores"},
				{name:"Menu", value:"Check your menu with !menu."},
				{name:"Hourly Income", value:`${uprofit}`}
            )

            message.channel.send(embed)
        }).catch((err) => {
            Advertiser.findOne({discord_id:message.author.id}).then(user => {
				console.log(user)
				console.log(user.sellers)
				let uprofit = 0;
			uprofit += (user.sellers.length * 1000) + 500
				const embed=new Discord.MessageEmbed()
            .setColor("#ccaaaa")
            .setTitle(`${user.name}'s stats (${client1.users.cache.get(user.discord_id).tag})`)
            .setAuthor(`${user.name}'s Stand.`, message.author.displayAvatarURL({format:"png", dynamic:true}))
            .addFields(
                {name:"PizzaTokens", value:`${user.pizzaTokens}`},
				{name:"Sellers", value:formatSellers(user.sellers)},
				{name:"Hourly Income", value:`${uprofit}`}
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