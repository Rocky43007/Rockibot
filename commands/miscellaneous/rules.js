const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class Invite extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "rules",
      group: "miscellaneous",
      memberName: "rules",
      description: "Shows the TGO Rules.",
    });
  }
  run(message) {
    if (message.guild.id !== "701830766673264652") return;
    const embed = new Discord.MessageEmbed()
      .setColor("#006da4")
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setTitle("Rules").setDescription(`
        Doesn't matter if you love 'em or hate 'em, read 'em.
        1. Don't curse excessively/without reason.
        2. Don't spam.
        3. Don't be racist, toxic, or offensive.
        4. Don't send anything NSFW or inappropriate.
        5. You must have a mentionable and appropriate nickname.
        6. Don't beg.
        7. Don't advertise in DMs or channels.
        8. Don't argue with staff.
        9. Follow Discord ToS.
        10. Use common sense!
        `);
    return message.channel.send(embed);
    // do what you need with lastMessage below
  }
};

