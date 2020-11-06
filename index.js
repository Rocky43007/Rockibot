const { ShardingManager } = require('discord.js');
const config = require("./config.js");
const manager = new ShardingManager('./bot.js', { token: config.token });

manager.spawn();
manager.on('shardCreate', shard => {

console.log(`Launched shard ${shard.id}`);
shard.on('message', (message) => {
  var regex = /restart (\d+)/im;
  if(regex.test(message)) {
	console.log(regex.exec(message)[1]);
        manager.shards.get(parseInt(regex.exec(message)[1])).respawn();
  }
});
});
