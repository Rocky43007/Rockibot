const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
const Canvas = require("canvas")
const client = new Discord.Client();
const ms = require("ms");
const Advertiser = require('./models/Advertiser.js');
// We now have a giveawaysManager property to access the manager everywhere!


module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'lookforstands',
			group: 'pizzatown',
			memberName: 'lookforstands',
            description: 'Allows advertisers to advertise their advertising agency to sellers.',
            args:[
                {
                    key:'ad',
                    prompt:'What do you want to display on your ad in #look-for-stands?',
                    type:'string',
                    max:300
                }
            ],
			guildOnly: true,
		});
	}
	async run(message, {ad}) {
        if(message.guild.id !== "739916829828448317"){
            message.channel.send("You are not in the Rockibot support server join to advertise your advertising agency!")
            return
        }
		Advertiser.findOne({discord_id:message.author.id}).then(async user => {
            console.log(user)
            if(user.pizzaTokens < 1000){
                message.reply("You cannot afford to advertise!")
            }
            else{
                user.pizzaTokens -= 1000
                await user.save()
                this.client.channels.cache.get('777943853897875498').send(`${user.name}: ${ad}`)
            }
        }).catch((err) => {
            console.log(err)
            message.reply("You are not an Advertiser!")
        })
	}
};

client.login(require("/home/rocky/RockibotBeta/config.js").token)