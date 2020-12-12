const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const {Seller} = require("./models/Sellers");
const client = new Discord.Client();
const Canvas = require("canvas")
const ms = require("ms");
const Advertiser = require('./models/Advertiser.js');
// We now have a giveawaysManager property to access the manager everywhere!


module.exports = class gstart extends Command {
	constructor(client) {
		super(client, {
			name: 'imagelookforstands',
			group: 'pizzatown',
			memberName: 'imagelookforstands',
            description: 'Allows advertisers to advertise their advertising agency to sellers with images.',
            args:[
                {
                    key:'ad',
                    prompt:'What do you want to display on your ad in #look-for-stands?',
                    type:'string',
                    validate:(str) => {
                        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                        return !!pattern.test(str);
                      }
                }
            ],
			guildOnly: true,
		});
	}
	async run(message, {ad}) {
        if(message.guild.id !== "739916829828448317"){
            message.channel.send("You are not in the Rockibot support server join https://discord.gg/fDGMCkp9cC to advertise your advertising agency!")
            return
        }
		Advertiser.findOne({discord_id:message.author.id}).then(async user => {
            console.log(user)
            if(user.pizzaTokens < 1000){
                message.reply("You cannot afford to advertise!")
            }
            else{
                const canvas = Canvas.createCanvas(500, 500)
                const ctx = canvas.getContext('2d')
                try{
                    const image = await Canvas.loadImage(ad)

                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

                    this.client.channels.cache.get('777943853897875498').send(`${user.name}:`, attachment)
                }
                catch(err){
                    message.reply("Image is invalid.")
                }
            }
        }).catch((err) => {
            console.log(err)
            message.reply("You are not an Advertiser!")
        })
	}
};

client.login(require("/home/rocky/RockibotBeta/config.js").token)