const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const leveling = require('discord-leveling');
const client = new Discord.Client();

module.exports = class lb extends Command {
	constructor(client) {
		super(client, {
            name: 'leaderboard',
            aliases: ['lb'],
			group: 'leveling',
			memberName: 'lb',
            description: 'Shows the server\'s XP Leaderboard.',
			guildOnly: true,
		});
	}
	async run(message) {
        leveling.Leaderboard({
            limit: 10 //Only takes top 3 ( Totally Optional )
          }).then(async users => { //make sure it is async
     
            if (users[0]) var firstplace = await client.users.fetch(users[0].userid);
            if (users[1]) var secondplace = await client.users.fetch(users[1].userid);
            if (users[2]) var thirdplace = await client.users.fetch(users[2].userid);
            if (users[3]) var four = await client.users.fetch(users[3].userid);
            if (users[4]) var five = await client.fetchUser(users[4].userid)
            if (users[5]) var six = await client.users.fetch(users[5].userid);
            if (users[6]) var seven = await client.users.fetch(users[6].userid);
            if (users[7]) var eight = await client.users.fetch(users[7].userid);
            if (users[8]) var nine = await client.users.fetch(users[8].userid);
            if (users[9]) var ten = await client.users.fetch(users[9].userid);

            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Leaderboard`)
            .addField(`${firstplace && firstplace.tag || 'Nobody Yet'} :`, `Level : ${users[0] && users[0].level || 'None'} (XP : ${users[0] && users[0].xp || 'None'})`)
            .addField(`${secondplace && secondplace.tag || 'Nobody Yet'} :`, `Level : ${users[1] && users[1].level || 'None'} (XP : ${users[1] && users[1].xp || 'None'})`)
            .addField(`${thirdplace && thirdplace.tag || 'Nobody Yet'} :`, `Level : ${users[2] && users[2].level || 'None'} (XP : ${users[2] && users[2].xp || 'None'})`)
            .addField(`${four && four.tag || 'Nobody Yet'} :`, `Level : ${users[3] && users[3].level || 'None'} (XP : ${users[3] && users[3].xp || 'None'})`)
            .addField(`${five && five.tag || 'Nobody Yet'} :`, `Level : ${users[4] && users[4].level || 'None'} (XP: ${users[4] && users[4].xp || 'None'})`)
            .addField(`${six && six.tag || 'Nobody Yet'} :`, `Level : ${users[5] && users[5].level || 'None'} (XP : ${users[5] && users[5].xp || 'None'})`)
            .addField(`${seven && seven.tag || 'Nobody Yet'} :`, `Level : ${users[6] && users[6].level || 'None'} (XP : ${users[6] && users[6].xp || 'None'})`)
            .addField(`${eight && eight.tag || 'Nobody Yet'} :`, `Level : ${users[7] && users[7].level || 'None'} (XP : ${users[7] && users[7].xp || 'None'})`)
            .addField(`${nine && nine.tag || 'Nobody Yet'} :`, `Level : ${users[8] && users[8].level || 'None'} (XP : ${users[8] && users[8].xp || 'None'})`)
            .addField(`${ten && ten.tag || 'Nobody Yet'} :`, `Level : ${users[9] && users[9].level || 'None'} (XP : ${users[9] && users[9].xp || 'None'})`)

            message.channel.send(embed);
     
          })

    }
};


