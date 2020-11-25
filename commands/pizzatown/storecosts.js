const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'storecosts',
			group: 'pizzatown',
			memberName: 'storecosts',
			description: 'Displays the costs of stores.',
			guildOnly: true,
		});
	}
	async run(message) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
			const urbancost=Math.round(user.stores.filter(store => store.profitmultiplier === 5).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 5).length / 5)) + 5000)
			const suburbancost=Math.round(user.stores.filter(store => store.profitmultiplier === 3).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 3).length / 5)) + 3000)
			const standcost=Math.round(user.stores.filter(store => store.profitmultiplier === 2).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 2).length / 5)) + 1000)
            const embed = new Discord.MessageEmbed()
            .setColor("#abcfff")
            .setTitle("Store costs")
            .addFields(
                {name:"Urban stores", value:urbancost},
                {name:"Suburban stores", value:suburbancost},
                {name:"Stands", value:standcost},
            )
            message.channel.send(embed)
        }).catch(() => {
	const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
        })
	}
};

