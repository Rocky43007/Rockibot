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
            name: 'implement',
            group: 'suggestions',
            memberName: 'implement',
            description: 'Implements.',
            args: [
                {
                    key: 'suggestion',
                    prompt: 'What do you want to implement?',
                    type: 'integer'
                },
                {
                    key:'comment',
                    prompt:'What is the comment for implementation?',
                    type:"string",
                    default:"No comment given."
                }
            ],
            clientPermissions:["MANAGE_MESSAGES", "ADMINISTRATOR"],
            userPermissions:["MANAGE_MESSAGES"],
            guildOnly: true
        });
    }
    async run(message, {suggestion, comment}) {
        message.delete()
        const suggestchannel = await schannel.findOne({guildname:message.guild.id})
        if(suggestchannel){
            suggestdb.findOne({suggestnum:suggestion, guildname:message.guild.id}).then((suggestion2) => {
                message.guild.channels.cache.find(c => c.name=== suggestchannel.channel).messages.fetch(suggestion2.messageid).then(msg => {
                    const embed = new Discord.MessageEmbed()
							.setColor('#add8e6')
							.setAuthor(suggestion2.author, suggestion2.authorim)
							.setTitle(`Suggestion #${suggestion2.suggestnum} Implemented`)
							.setDescription(suggestion2.suggestion)
							.addField(`Comment from ${message.author.tag}:`, comment);
                    msg.edit(embed)
                })
            }).catch(() => {
                message.reply(`There is no suggestion in this server with an id of ${suggestion}`)
            })
        } else{
            message.reply("This server does not have a channel for suggestions.")
        }
    }
};

