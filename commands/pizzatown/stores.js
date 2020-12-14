const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'stores',
			group: 'pizzatown',
			memberName: 'stores',
			description: 'Views your stores.',
			guildOnly: true,
		});
	}
	async run(message) {
		Seller.findOne({ discord_id: message.author.id }).then(user => {
			let stands = 0
			let suburbs = 0
			let urbans = 0
			let profitmultiplier = 0
			user.stores.forEach(store => {
				profitmultiplier += store.profitmultiplier
				store.profitmultiplier === 2 ? stands++ : store.profitmultiplier === 3 ? suburbs++ : urbans++
			})
			const membed = new Discord.MessageEmbed()
				.setColor('#71EEB8')
				.setTitle(`${user.name}'s Stores`)
				.addFields(
					{name:"Stands", value:stands},
					{name:"Suburban stores", value:suburbs},
					{name:"Urban stores.", value:urbans},
					{name:"Profit multiplier", value:profitmultiplier}
				)
				.setFooter(`Use '${message.guild.commandPrefix}storebuy' to gain more profit!`)
			message.channel.send(membed)
		}).catch(() => {
			const embed = new Discord.MessageEmbed()
				.setColor('#c22419')
				.setTitle("You are not a seller!")
			return message.channel.send(embed);
		})
	}
};

