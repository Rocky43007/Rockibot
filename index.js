const { ShardingManager } = require('discord.js');
const config = require("./config.js");
const manager = new ShardingManager('./bot.js', { token: config.token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
