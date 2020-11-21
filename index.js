const { ShardingManager } = require('discord.js');
const config = require("./config.js");
const manager = new ShardingManager('./bot.js', { token: config.token });
const Discord = require('discord.js');
manager.spawn();
manager.on('shardCreate', shard => {
const webhookClient = new Discord.WebhookClient(config.webID, config.webToken);
console.log(`Launched shard ${shard.id}`);
shard.on('message', (message) => {
  var regex = /restart (\d+)/im;
  if(regex.test(message)) {
        console.log(regex.exec(message)[1]);
        manager.shards.get(parseInt(regex.exec(message)[1])).respawn();
  }
});
shard.on('death', (death) => {
  console.log(`Shard ${shard.id} killed. Restarting....`);
  webhookClient.send(`🔴 Shard ${shard.id} killed. Restarting....`, {
    username: 'Rockibot Shard Logging',
  });
});
  webhookClient.send(`🟢 Launched shard ${shard.id}`, {
    username: 'Rockibot Shard Logging',
  });

});
