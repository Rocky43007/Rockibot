const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");

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
		const format = (object) => {
			return `
    Type: ${object.profitmultiplier === 2 ? "Stand" : object.profitmultiplier === 3 ? "Suburban Store" : "Urban Store"},
    Profit Multiplier: ${object.profitmultiplier}
			`
		}
        Seller.findOne({discord_id:message.author.id}).then(async user => {
			let stores=""
			for(let i=0; i<user.stores.length; i++){
				stores += `${i+1}. ${format(user.stores[i])} \n`
			}
			const membed = new Discord.MessageEmbed()
                                .setColor('#71EEB8')
                                .setTitle(`${user.name}'s Stores`)
                                .setDescription("```"+ stores +"```")
				.setFooter(`Use '${message.guild.commandPrefix}storebuy' to add food!`) 
			message.channel.send(membed)
        }).catch(() => {
	const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
        })
	}
};

