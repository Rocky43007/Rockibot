const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'menuitem',
			group: 'pizzatown',
			memberName: 'menuitem',
            description: 'Views an item in your menu',
            args:[
                {
                    key:'id',
                    prompt:'What is the id of the item you would like to view?',
                    type:'string'
                }
            ],
			guildOnly: true,
		});
	}
	async run(message, { id }) {
        Seller.findOne({discord_id:message.author.id}).then(user => {
			if(!user){
				const embed = new Discord.MessageEmbed()
	.setColor('#c22419')
	.setTitle("You are not a seller!")
        return message.channel.send(embed);
			}
			if(!user.menu[id-1]){
				const embed = new Discord.MessageEmbed()
       				.setColor('#c22419')
	        		.setTitle("This item does not exist!")
        			return message.channel.send(embed);
			}
			const membed = new Discord.MessageEmbed()
                                .setColor('#71EEB8')
                                .setTitle(`Menu Item ${id}`)
                                .addFields(
                                    {name:"Name", value:user.menu[id - 1].name},
                                    {name:"Cost", value:user.menu[id - 1].cost},
                                    {name:"Production Cost", value:user.menu[id - 1].production},
                                )

			message.channel.send(membed)
        })
	}
};

