const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'menu',
			group: 'pizzatown',
			memberName: 'menu',
			description: 'Views your menu',
			guildOnly: true,
		});
	}
	async run(message) {
		const format = (object) => {
			return `
	Name: ${object.name}
	Cost: ${object.cost}
	Production Cost: ${object.production}
			`
		}
        Seller.findOne({discord_id:message.author.id}).then(user => {
			let menu=""
			for(let i=0; i<user.menu.length; i++){
				menu += `${i+1}. ${format(user.menu[i])} \n`
			}
			if(!menu){
				const embed = new Discord.MessageEmbed()
       				.setColor('#c22419')
	        		.setTitle("Your menu is empty!")
				.setDescription(`Use \`${message.guild.commandPrefix}menuadd\` to add food!`) 
        			return message.channel.send(embed);
			}
			const membed = new Discord.MessageEmbed()
                                .setColor('#71EEB8')
                                .setTitle(`${user.name}'s Menu`)
                                .setDescription("```"+ menu +"```")
				.setFooter(`Use '${message.guild.commandPrefix}menuadd' to add food!`) 
			message.channel.send(membed)
        }).catch(() => {
	const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
        })
	}
};

