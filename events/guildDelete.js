// This event executes when a guild (server) is left.
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.user.setActivity(`for @${this.client.user.username} help | ${this.client.guilds.size} Servers`, { type: "WATCHING" });
    // Well they're gone. Let's remove them from the settings!
    this.client.settings.delete(guild.id);
  }
};
