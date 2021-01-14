const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class help2 extends Command {
        constructor(client) {
                super(client, {
                        name: 'help',
                        group: 'miscellaneous',
                        memberName: 'help',
                        description: 'Shows the list of commands',
                        args: [
                                {
                                        key: 'page',
                                        prompt: 'Which page number would you like to go to?',
                                        type: 'string',
                                        default: '0'
                                },
                        ],
                });
        }
        run(message, { page }) {
                const home = new Discord.MessageEmbed()
                .setColor('#03d3fc')
                .setTitle('Rockibot | Help')
                .addField('Page 1: General Commands', 'These commands are given to everyone, and is the module that every user gets when they use the bot.')
                .addField('Page 2: Moderation Commands', `These commands are for moderating servers, such as \`${message.guild.commandPrefix}ban\`, \`${message.guild.commandPrefix}kick\` and more!`)
                .addField('Page 3: Music Commands', `These commands are for the music aspect of the bot. Here, you can find information of \`${message.guild.commandPrefix}play\`, \`${message.guild.commandPrefix}join\` and more!`)
                .addField('Page 4: Suggestion Commands', `These commands relate to suggestions! Here, you can find information about \`${message.guild.commandPrefix}suggest\`, \`${message.guild.commandPrefix}suggest-channel\` and more!`)
                .addField('Page 5: PizzaTown Commands', `These commands are for PizzaTown! Here, you can find information about \`${message.guild.commandPrefix}pstart\`, \`${message.guild.commandPrefix}menu\` and more!`)
                .addField('Page 6: Giveaway Commands', `These commands are for giveaways! Here, you can find information about \`${message.guild.commandPrefix}gstart\`, \`${message.guild.commandPrefix}gend\` and more!`)
                .addField('Links', '[Website](https://rockibot.ml)\n[Dashboard](https://dash.rockibot.ml)')

                const basic = new Discord.MessageEmbed()
                        .setColor('#4e03fc')
                        .setTitle('Rockibot | General Commands')
                        .setDescription('Please remove the `<>` when using the commands!')
                        .addField('help', 'Displays a list of available commands for Rockibot.')
                        .addField('prefix', `Display\'s the prefix of the bot on the server. To change, just do \`${message.guild.commandPrefix}prefix <new prefix>\` or \`@Rockibot prefix <new prefix>\`.`)
                        .addField('ping', 'See how fast the API reponse is between you and the bot.')
                        .addField('status', 'Used to check if the bot is working or not.')
                        .addField('stats', 'Nerdy stats for those who want to see who made the bot, and how much memory is being used, and what version the bot is.')
                        .addField('invite', 'Allows other users to invite the bot to their own server.')
                        .addField('dashboard', 'Takes you to the bot\'s dashboard.')
                        .addField('vote', 'Takes you to the bot\'s vote page.')
                        .addField('echo', 'Send a message through the bot!')
                        .addField('changelog', 'Shows the latest changelog of the bot from the support server.')

                const suggestions = new Discord.MessageEmbed()
                        .setColor('#71EEB8')
                        .setTitle('Rockibot | Suggestions Commands')
                        .setDescription('Please remove the `<>` when using the commands!')
                        .addField('suggest-channel', `Sets the channel where the suggestions will be found. Usage: \`${message.guild.commandPrefix}suggest-channel <Suggestion Channel Name without #>\`.`)
                        .addField('suggestion', `Sends a suggestion to the suggestion channel. Usage: \`${message.guild.commandPrefix}suggestion <Suggestion>\`.`)
                        .addField('approve', `Says that the suggestion is approved. Usage: \`${message.guild.commandPrefix}approve <Suggestion Message ID> <Comments>\`.`)
                        .addField('consider', `Says that the suggestion is considered. Usage: \`${message.guild.commandPrefix}consider <Suggestion Message ID> <Comments>\`.`)
                        .addField('implement', `Says that the suggestion is implemented. Usage: \`${message.guild.commandPrefix}implement <Suggestion Message ID> <Comments>\`.`)
                        .addField('deny', `Says that the suggestion is denied. Usage: \`${message.guild.commandPrefix}deny <Suggestion Message ID> <Comments>\`.`)

                const mod = new Discord.MessageEmbed()
                        .setColor('#ff2050')
                        .setTitle('Rockibot | Moderation Commands')
                        .setDescription('Please remove the `<>` when using the commands!')
                        .addField('ban', `Bans users from the server. Usage: \`${message.guild.commandPrefix}ban <Mention User or User ID> <Reason>\`.`)
                        .addField('kick', `Kicks users from the server. Usage: \`${message.guild.commandPrefix}kick <Mention User or User ID> <Reason>\`.`)
                        .addField('modlog', `Sets the modeation log channel of the server. Usage: \`${message.guild.commandPrefix}modlog <Channel Name without #>\`.`)
                        .addField('mute', `Used to mute members on the server. Usage: \`${message.guild.commandPrefix}mute <Mention User or User ID> <Reason> <time>\`.`)
                        .addField('unmute', `Un-mutes the mentioned muted user. Usage: \`${message.guild.commandPrefix}unmute <Mention User or User ID>\`.`)
                        .addField('purge', `Used to remove specific number of messages on the server. Usage: \`${message.guild.commandPrefix}purge <Number of messages>\`.`)
                        .addField('warn', `Allows staff to warn a member. Usage: \`${message.guild.commandPrefix}warn <Mention User or User ID> <Reason>\`.`)
                        .addField('unwarn', `Allows staff to remove a warn from a member. Usage: \`${message.guild.commandPrefix}unwarn <Mention User or User ID> <Reason>\`.`)
                        .addField('warns', `Allows staff to see how many warns a user has. Usage: \`${message.guild.commandPrefix}warns <Mention User or User ID>\`.`)
                        .addField('lock', 'Lock a channel so users can\'t send messages there!')
						.addField('unlock', 'Unlock a locked channel!')

		const music = new Discord.MessageEmbed()
                 .setColor('#2e77b8')
                 .setTitle('Rockibot | Music Commands')
                 .setDescription('Please remove the `<>` when using the commands!')
                 .addField('play', `Plays songs in the voice channel. Auto joins the voice channel that user is in. Usage: \`${message.guild.commandPrefix}play <Youtube link/Spotify link/Song name>\`.`)
                 .addField('pause', 'Pauses the music being played.')
                 .addField('stop', 'Stops the player, clears the queue and leaves the voice channel.')
                 .addField('resume', 'Resumes the music that was paused.')
                 .addField('queue', 'Shows the server queue.')
                 .addField('skip', 'Skips to the next song in the queue.')
                 .addField('loop', 'Loops the queue.')
                 .addField('shuffle', 'Shuffles the queue.')
                 .addField('nowplaying', 'Shows the song name of the song playing.')
                 .addField('remove', 'Remove a song from the queue.')
                 .addField('seek', `Skip to a specific part of the song from the time stamps. Example: \`${message.guild.commandPrefix}seek 1:30\`.`)
                 .addField('search', 'Search for a song on Youtube.')
                 .addField('lyrics', 'Get the lyrics of a song.')

                const pizzatown = new Discord.MessageEmbed()
                        .setColor('#66ff00')
                        .setTitle('Rockibot | PizzaTown Commands')
                        .setDescription('Please remove the `<>` when using the commands!')
                        .addField('findadvertisers', 'Allows advertisers to advertise their advertising agency to sellers.')
                        .addField('lookforstands', 'Allows advertisers to advertise their advertising agency to sellers.')
                        .addField('menu', 'View your shack\'s menu.')
                        .addField('menuadd', 'Adds an item to your menu.')
                        .addField('menuedelete', 'Deletes an item from your menu.')
                        .addField('menuedit', 'Edits an item from your menu.')
                        .addField('pstart', 'Starts your pizza town journey.')
                        .addField('pstats', 'Shows your pizza town stats.')
                        .addField('storebuy', 'Buys a store.')
                        .addField('stores', 'Views your stores.')
                const giveaways = new Discord.MessageEmbed()
                        .setColor('#28b84f')
                        .setTitle('Rockibot | Giveaway Commands')
                        .setDescription('Please remove the `<>` when using the commands!')
                        .addField('gstart', `Start the giveaway! Usage: \`${message.guild.commandPrefix}gstart <#channel> <Prize> <Time> <Number of Winners>\`.`)
						.addField('gend', `End a giveaway! Usage: \`${message.guild.commandPrefix}gend <Message ID>\`.`)
						.addField('grool', `Reroll a giveaway! Usage: \`${message.guild.commandPrefix}groll <Message ID>\`.`)


                switch (page) {
                        case "1":
                                return message.channel.send({ embed: basic })
                        case "2":
                                return message.channel.send({ embed: mod })
                        case "3":
                                return message.channel.send({ embed: music })
                        case "4":
                                return message.channel.send({ embed: suggestions })
                        case "5":
                                return message.channel.send({ embed: pizzatown})
                        case "6":
								return message.channel.send({ embed: giveaways})
                        default:
                                home.setDescription(`Use \`${message.guild.commandPrefix}help [page]\` to switch pages!`)
                                return message.channel.send({ embed: home })
                        }
        }
};
