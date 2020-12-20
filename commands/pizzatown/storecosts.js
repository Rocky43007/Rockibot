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
	async run(message, {type}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
			const urbancost=(((5000 * user.stores.filter(store => store.profitmultiplier === 5).length)) * (user.stores.filter(store => store.profitmultiplier === 5).length)) + 5000
			const suburbancost=(((3000 * user.stores.filter(store => store.profitmultiplier === 3).length)) * (user.stores.filter(store => store.profitmultiplier === 3).length)) + 3000
			const standcost=(((2000 * user.stores.filter(store => store.profitmultiplier === 2).length)) * (user.stores.filter(store => store.profitmultiplier === 2).length)) + 2000
			
            const embed=new Discord.MessageEmbed()
            .setColor("#c826fd")
            .setTitle("Store costs.")
            .addFields(
                {name:"Urban costs", value:urbancost},
                {name:"Suburban costs", value:suburbancost},
                {name:"Stand costs", value:standcost},
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

