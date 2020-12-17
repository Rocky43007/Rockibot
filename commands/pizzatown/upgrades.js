const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const { Seller } = require("./models/Sellers");
const Advertiser = require('./models/Advertiser');

module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'upgrades',
			group: 'pizzatown',
			memberName: 'upgrades',
			description: 'Views your upgrade levels.',
			guildOnly: true,
		});
	}
	async run(message) {
		Seller.findOne({ discord_id: message.author.id }).then(user => {
			const embed = new Discord.MessageEmbed()
				.setColor('#c22419')
                .setTitle("Your upgrades")
                .setThumbnail(message.author.displayAvatarURL({format:"png", dynamic:true}))
                .addFields(
                    {name:"Nicer Bathroom", value:`(${user.bathrooms}/15)${user.bathrooms !== 15 ? `\n cost:${user.bathrooms*(150*user.bathrooms) + 150}` : ''}\n id:bathroom\n income:+${15*user.bathrooms + 15}`},
                    {name:"Nicer Soda Machine", value:`(${user.sodaMachine}/5)${user.sodaMachine !== 5 ? `\n cost:${user.sodaMachine*(50*user.sodaMachine) + 50}` : ''}\n id:soda\n income:+${5*user.sodaMachine + 5}`},
                    {name:"Nicer Topping Bar", value:`(${user.toppingBar}/10)${user.toppingBar !== 10 ? `\n cost:${user.toppingBar*(100*user.toppingBar) + 100}` : ''}\n id:topping\n income:+${10*user.toppingBar + 10}`},
                    {name:"Nicer Play Place", value:`(${user.playPlace}/15)${user.playPlace !== 15 ? `\n cost:${user.playPlace*(150*user.playPlace) + 150}` : ''}\n id:play\n income:+${15*user.playPlace + 15}`}
                )
			return message.channel.send(embed);
		}).catch(() => {
			Advertiser.findOne({ discord_id: message.author.id }).then(user => {
				const embed = new Discord.MessageEmbed()
					.setColor('#c22419')
					.setTitle("Your upgrades")
					.setThumbnail(message.author.displayAvatarURL({format:"png", dynamic:true}))
					.addFields(
						{name:"More Offices", value:`(${user.offices}/15)${user.offices !== 15 ? `\n cost:${user.offices*(150*user.offices) + 150}` : ''}\n id:office\n income:+${15*user.offices + 15}`},
						{name:"More Air Time", value:`(${user.airTime}/5)${user.airTime !== 5 ? `\n cost:${user.airTime*(50*user.airTime) + 50}` : ''}\n id:air\n income:+${5*user.airTime + 5}`},
						{name:"More TV Channels", value:`(${user.tvChannels}/10)${user.tvChannels !== 10 ? `\n cost:${user.tvChannels*(100*user.tvChannels) + 100}` : ''}\n id:tv\n income:+${10*user.tvChannels + 10}`},
						{name:"More Production From Employees", value:`(${user.employeeProduction}/15)${user.employeeProduction !== 15 ? `\n cost:${user.employeeProduction*(150*user.employeeProduction) + 150}` : ''}\n id: employee\n income:+${15*user.employeeProduction + 15}`}
					)
				return message.channel.send(embed);
			}).catch((err) => {
				console.log(err)
				const embed = new Discord.MessageEmbed()
					.setColor('#c22419')
					.setTitle("You don't have an account!")
				return message.channel.send(embed);
			})
		})
	}
};

