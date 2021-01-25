const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
const ms = require("ms");
const sChannel = require("./models/schannel")
const suggestdb = require("./models/suggestdb");
const schannel = require('./models/schannel');

module.exports = class gstart extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            group: 'suggestions',
            memberName: 'suggest',
            description: 'Suggests.',
            args: [
                {
                    key: 'suggestion',
                    prompt: 'What do you want to suggest?',
                    type: 'string'
                }
            ],
            clientPermissions:["MANAGE_MESSAGES"],
            guildOnly: true
        });
    }
    async run(message, {suggestion}) {
        const suggestchannel = await schannel.findOne({guildname:message.guild.id})
        if(suggestchannel){
	    const embed = new Discord.MessageEmbed()
		.setColor('#738ADB')
		.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
		.setTitle(`Suggestion #${suggestchannel.suggestnum}`)
		.setDescription(suggestion)
            var sChannel = message.guild.channels.cache.find(c => c.name=== suggestchannel.channel);
	    if (sChannel === undefined) sChannel =  message.guild.channels.cache.find(c => c.id === suggestchannel.channel);
	    if(!sChannel) return message.reply('This server does not have a suggestion channel!');
sChannel.send(embed).then(async embedMessage => {
		embedMessage.react('⬆️').then(
        embedMessage.react('⬇️'));	
	
        const newsuggestion = new suggestdb({
            messageid:embedMessage.id,
            author:message.author.id,
            authorim:message.author.displayAvatarURL(),
            suggestion,
            suggestnum:suggestchannel.suggestnum,
            guildname:message.guild.id
        })
        await newsuggestion.save()
        suggestchannel.suggestnum++
            await suggestchannel.save()
       });
            
        } else{
            message.reply("This server does not have a channel for suggestions.")
        }
    }
};

