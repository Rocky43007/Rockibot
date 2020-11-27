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
			description: 'Shows store costs.',
			guildOnly: true,
		});
	}
	async run(message, {type}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
			const urbancost=Math.round(user.stores.filter(store => store.profitmultiplier === 5).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 5).length / 5)) + 5000)
			const suburbancost=Math.round(user.stores.filter(store => store.profitmultiplier === 3).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 3).length / 5)) + 3000)
			const standcost=Math.round(user.stores.filter(store => store.profitmultiplier === 2).length * (1000 * (user.stores.filter(store => store.profitmultiplier === 2).length / 5)) + 1000)
            const embed = new Discord.MessageEmbed()
            message.channel.send(embed)
	.setColor('#c22419')
    .setTitle("Store costs")
    .addFields(
        {name:"Urban cost", value:urbancost},
        {name:"Suburban cost", value:suburbancost},
        {name:"Stand cost", value:standcost}
    )
        }).catch(() => {
	const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
        })
	}
};

