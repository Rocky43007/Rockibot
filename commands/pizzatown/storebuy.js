const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'storebuy',
			group: 'pizzatown',
			memberName: 'storebuy',
			description: 'Buys a store.',
			args:[
				{
					key:'type',
					type:'integer',
					prompt:'Enter a number for the type of store you want \n 1. Urban store (10000 PizzaTokens) \n 2. Suburban store (3000 PizzaTokens) \n 3. Stand (1000 PizzaTokens)',
					min:1,
					max:3
				}
			],
			guildOnly: true,
		});
	}
	async run(message, {type}) {
        Seller.findOne({discord_id:message.author.id}).then(async user => {
			if(type===1){
				if(user.pizzaTokens<10000){
					message.reply("You cannot afford an Urban store!")
				}
				else{
					user.stores.push({profitmultiplier:5})
					user.pizzaTokens -= 10000
					await user.save()
					message.reply("Urban store bought.")
				}
			}
			else if(type===2){
				if(user.pizzaTokens<3000){
					message.reply("You cannot afford a Suburban store!")
				}
				else{
					user.stores.push({profitmultiplier:3})
					user.pizzaTokens -= 3000
					await user.save()
					message.reply("Suburban store bought.")
				}
			}
			else{
				if(user.pizzaTokens<1000){
					message.reply("You cannot afford a stand!")
				}
				else{
					user.stores.push({profitmultiplier:2})
					user.pizzaTokens -= 1000
					await user.save()
					message.reply("Stand bought.")
				}
			}
        }).catch(() => {
	const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
        })
	}
};

