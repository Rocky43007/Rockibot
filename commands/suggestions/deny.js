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
            name: 'deny',
            group: 'suggestions',
            memberName: 'deny',
            description: 'Denies.',
            args: [
                {
                    key: 'suggestion',
                    prompt: 'What do you want to deny?',
                    type: 'integer'
                },
                {
                    key:'comment',
                    prompt:'What is the comment for denying?',
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
							.setColor('#8B0000')
							.setAuthor(this.client.users.cache.get(suggestion2.author).tag, suggestion2.authorim)
							.setTitle(`Suggestion #${suggestion2.suggestnum} Denied`)
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

