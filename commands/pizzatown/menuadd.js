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
// We now have a giveawaysManager property to access the manager everywhere!
client1.giveawaysManager = manager;

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'menuadd',
			group: 'pizzatown',
			memberName: 'menuadd',
            description: 'Adds an item to your menu.',
            args:[
                {
                    key:'name',
                    prompt:'What is the name of this item you want to add?',
                    type:'string'
                },
                {
                    key:'cost',
                    prompt:'What is the cost of this pizza?',
                    type:'integer',
                    min:1,
                    max:1000
                },
                {
                    key:'prodcost',
                    prompt:'What is the production cost of this pizza?',
                    type:'integer',
                    min:1,
                    max:1000
                },
            ],
			guildOnly: true,
		});
	}
	async run(message, {name, cost, prodcost}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
            if(user.menu.length>=(Math.round(user.stores.length / 5) + 1)){
                message.channel.send(`Your menu item limit is ${Math.round(user.stores.length / 5) + 1}! Purchase another ${((Math.round(user.stores.length / 5) + 1) * 5) - user.stores.length} stores to increase that!`)
                return
            }
            user.menu.push({name, cost, production:prodcost})

            await user.save()

            message.channel.send(`${name} is now in your menu.`)
        }).catch(() => {
            message.reply("You are not a seller!")
        })
	}
};

