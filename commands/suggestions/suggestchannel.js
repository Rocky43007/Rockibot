const { Command } = require('discord.js-commando');
const path = require('path');
const mconfig = require(path.join(__dirname, 'mconfig.json'));
const Discord = require("discord.js");
client1 = new Discord.Client();
// Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client1, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#44ff00",
        embedColorEnd: "#d61818",
        reaction: "🎉"
    }
});
const ms = require("ms");
const sChannel = require("./models/schannel")
// We now have a giveawaysManager property to access the manager everywhere!
client1.giveawaysManager = manager;

module.exports = class gstart extends Command {
    constructor(client) {
        super(client, {
            name: 'suggestchannel',
            group: 'suggestions',
            memberName: 'suggestchannel',
            description: 'Sets a channel for suggestions.',
            args: [
                {
                    key: 'channel',
                    prompt: 'What channel do you want suggestions to be placed in? Please do not use "#".',
                    type: 'string'
                }
            ],
            userPermissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
            clientPermissions: ["ADMINISTRATOR"],
            guildOnly: true
        });
    }
    async run(message, { channel }) {
        if (!await sChannel.findOne({ guildname: message.guild.id })) {
            if (message.guild.channels.cache.find(c => c.name === channel)) {
                const newchannel = new sChannel({ guildname: message.guild.id, channel: channel })
                await newchannel.save()
                message.reply(`#${channel} is now your suggestion channel.`)
            }
            else {
                message.reply("That channel does not exist.")
            }
        }
        else {
            message.reply("This server already has a suggestion channel!")
        }
    }
};

