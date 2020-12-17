const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");
const Advertiser = require('./models/Advertiser');

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'upgrade',
			group: 'pizzatown',
			memberName: 'upgrade',
            description: 'Upgrade.',
            args:[
                {
                    key:"id",
                    prompt:"What is the id of the item you want to upgrade?",
                    type:"string"
                }
            ],
			guildOnly: true,
		});
	}
	async run(message, { id }) {
		Seller.findOne({ discord_id: message.author.id }).then(async user => {
            if(!user){
                throw Error("Error piece of shit big boi fuck everything")
            }
			if(id==="bathroom"){
                if(user.pizzaTokens<user.bathrooms*(150*user.bathrooms) + 150){
                    const embed = new Discord.MessageEmbed()
                        .setColor('#c22419')
                        .setTitle(`You need ${user.bathrooms*(150*user.bathrooms) + 150} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                    return message.channel.send(embed); 
                }
                else if(user.bathrooms===15){
                    message.reply("You have already maxed out your bathrooms!")
                }
                else{
                    user.pizzaTokens -= user.bathrooms*(150*user.bathrooms) + 150
                    user.bathrooms++
                    message.reply("You have upgraded your bathrooms.")
                    await user.save()
                }
            }
            else if(id==="soda"){
                if(user.pizzaTokens<user.sodaMachine*(50*user.sodaMachine) + 50){
                    const embed = new Discord.MessageEmbed()
                        .setColor('#c22419')
                        .setTitle(`You need ${user.sodaMachine*(50*user.sodaMachine) + 50} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                    return message.channel.send(embed); 
                }
                else if(user.sodaMachine===5){
                    message.reply("You have already maxed out your soda machines!")
                }
                else{
                    user.pizzaTokens -= user.sodaMachine*(50*user.sodaMachine) + 50
                    user.sodaMachine++
                    message.reply("You have upgraded your soda machines.")
                    await user.save()
                }
            }
            else if(id==="topping"){
                if(user.pizzaTokens<user.toppingBar*(100*user.toppingBar) + 100){
                    const embed = new Discord.MessageEmbed()
                        .setColor('#c22419')
                        .setTitle(`You need ${user.toppingBar*(100*user.toppingBar) + 100} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                    return message.channel.send(embed); 
                }
                else if(user.toppingBar===10){
                    message.reply("You have already maxed out your topping bars!")
                }
                else{
                    user.pizzaTokens -= user.toppingBar*(100*user.toppingBar) + 100
                    user.toppingBar++
                    message.reply("You have upgraded your topping bars.")
                    await user.save()
                }
            }
            else if(id==="play"){
                if(user.pizzaTokens<user.playPlace*(150*user.playPlace) + 150){
                    const embed = new Discord.MessageEmbed()
                        .setColor('#c22419')
                        .setTitle(`You need ${user.playPlace*(150*user.playPlace) + 150} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                    return message.channel.send(embed); 
                }
                else if(user.playPlace===15){
                    message.reply("You have already maxed out your play places!")
                }
                else{
                    user.pizzaTokens -= user.playPlace*(150*user.playPlace) + 150
                    user.playPlace++
                    message.reply("You have upgraded your play places.")
                    await user.save()
                }
            }
            else{
                message.reply(id + " is not a valid id! Use one of the following: `bathroom`, `soda`, `topping`, `play`")
            }
		}).catch(() => {
            Advertiser.findOne({ discord_id: message.author.id }).then(async user => {
                if(id==="office"){
                    if(user.pizzaTokens<user.offices*(150*user.offices) + 150){
                        const embed = new Discord.MessageEmbed()
                            .setColor('#c22419')
                            .setTitle(`You need ${user.offices*(150*user.offices) + 150} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                        return message.channel.send(embed); 
                    }
                    else if(user.offices===15){
                        message.reply("You have already maxed out your offices!")
                    }
                    else{
                        user.pizzaTokens -= user.offices*(150*user.offices) + 150
                        user.offices++
                        message.reply("You have upgraded your offices.")
                        await user.save()
                    }
                }
                else if(id==="air"){
                    if(user.pizzaTokens<user.airTime*(50*user.airTime) + 50){
                        const embed = new Discord.MessageEmbed()
                            .setColor('#c22419')
                            .setTitle(`You need ${user.airTime*(50*user.airTime) + 50} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                        return message.channel.send(embed); 
                    }
                    else if(user.airTime===5){
                        message.reply("You have already maxed out your air time!")
                    }
                    else{
                        user.pizzaTokens -= user.airTime*(50*user.airTime) + 50
                        user.airTime++
                        message.reply("You have upgraded your air time.")
                        await user.save()
                    }
                }
                else if(id==="tv"){
                    if(user.pizzaTokens<user.tvChannels*(100*user.tvChannels) + 100){
                        const embed = new Discord.MessageEmbed()
                            .setColor('#c22419')
                            .setTitle(`You need ${user.tvChannels*(100*user.tvChannels) + 100} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                        return message.channel.send(embed); 
                    }
                    else if(user.tvChannels===10){
                        message.reply("You have already maxed out your TV channels!")
                    }
                    else{
                        user.pizzaTokens -= user.tvChannels*(100*user.tvChannels) + 100
                        user.tvChannels++
                        message.reply("You have upgraded your TV channels.")
                        await user.save()
                    }
                }
                else if(id==="employee"){
                    if(user.pizzaTokens<user.employeeProduction*(150*user.employeeProduction) + 150){
                        const embed = new Discord.MessageEmbed()
                            .setColor('#c22419')
                            .setTitle(`You need ${user.employeeProduction*(150*user.employeeProduction) + 150} PizzaTokens to buy this upgrade. You only have ${user.pizzaTokens}.`)
                        return message.channel.send(embed); 
                    }
                    else if(user.employeeProduction===15){
                        message.reply("You have already maxed out your employee production!")
                    }
                    else{
                        user.pizzaTokens -= user.employeeProduction*(150*user.employeeProduction) + 150
                        user.employeeProduction++
                        message.reply("You have upgraded your emplpyee production.")
                        await user.save()
                    }
                }
                else{
                    message.reply(id + " is not a valid id! Use one of the following: `office`, `air`, `tv`, `employee`")
                }
            }).catch(() => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#c22419')
                    .setTitle("You are not a seller!")
                return message.channel.send(embed);
            })
		})
	}
};

