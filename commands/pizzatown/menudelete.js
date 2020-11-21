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
			name: 'menudelete',
			group: 'pizzatown',
			memberName: 'menudeletes',
            description: 'Deletes an item from your menu.',
            args:[
                {
                    key:'id',
                    prompt:'What is id of the item you want to remove?',
                    type:'integer',
                    min:0
                }
            ],
			guildOnly: true,
		});
	}
	async run(message, {id}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
            if(user.menu.length<id){
                message.channel.send("You don't have an item with an id of "+number+"!");
                return
            }
            user.menu.splice(id - 1, 1)
            await user.save()

            message.channel.send(`Item ${id} was deleted from your menu.`)
        }).catch(() => {
            message.reply("You are not a seller!")
        })
	}
};

