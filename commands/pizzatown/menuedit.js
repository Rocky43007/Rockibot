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
			name: 'menuedit',
			group: 'pizzatown',
			memberName: 'menuedit',
            description: 'Edits an item from your menu.',
            args:[
                {
                    key:'id',
                    prompt:'What is id of the item you want to edit?',
                    type:'integer',
                    min:0
                },
                {
                    key:'name',
                    prompt:'What is the new name of the item you want to edit?',
                    type:'string'
                },
                {
                    key:'cost',
                    prompt:'What is the new cost of the item you want to edit?',
                    type:'integer',
                    min:1,
                    max:1000
                },
                {
                    key:'prodcost',
                    prompt:'What is the new production cost of the item you want to edit?',
                    type:'integer',
                    min:0,
                    max:1000
                },
            ],
			guildOnly: true,
		});
	}
	async run(message, {id, name, cost, prodcost}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
            if(user.menu.length<id){
                message.channel.send("You don't have an item with an id of "+id+"!");
                return
            }
            for(let i=0; i<user.menu.length; i++){
                if(i===id - 1){
                    user.menu[i] = {name, cost, production:prodcost}
                }
            }
            await user.save()

            message.channel.send(`Item ${id} was edited in your menu.`)
        }).catch((err) => {
            console.log(err)
            message.reply("You are not a seller!")
        })
	}
};

