const Keyv = require("keyv");
const prefixes = new Keyv(
  "sqlite:///home/rocky/Rockibot/databases/prefix.sqlite"
);
const modules = new Keyv(
  "sqlite:///home/rocky/Rockibot/databases/modules.sqlite"
);
const c = require('chalk');
module.exports = {
  name: "message",
  exec: async (client, msg) => {
    const enabled = await modules.get(msg.guild.id);
    console.log(c.red(enabled));
    if (!msg.guild) return;
    if (msg.author.bot) return;
    const sprefix = await prefixes.get(msg.guild.id);
    if (sprefix.prefix === null) {
      const prefix = "!";
      console.log(prefix);
      if (!msg.content.startsWith(prefix)) return;
    } else {
      if (!msg.content.startsWith(sprefix.prefix)) return;
    }

    console.log(msg.guild.id);
    //if (msg.guild.id !== '746435442521538730') {
    //              return msg.channel.send('The Music Module is Disabled');
    //}
    const args = msg.content.slice(client.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find((c) => c.aliases && c.aliases.includes(commandName));
    if (command) {
      try {
	if (!enabled.includes('music')) return msg.channel.send('The music module is disabled! Enable it from the dashboard!');
        await command.exec(msg, args);
      } catch (e) {
        console.error(e);
      }
    }
  },
};

