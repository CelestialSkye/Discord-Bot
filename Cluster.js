const Cluster = require('discord-hybrid-sharding');
const Config = require('./config/bot.json');
const c = require('colors');

const manager = new Cluster.Manager(`./main.js`, {
    totalShards: 'auto',
    shardsPerClusters: 2,
    mode: 'process',
    token: Config.token,
});

manager.on('clusterCreate', cluster => console.log(c.green('[Cluster]') + ` ${cluster.id} Iniciado!`));
manager.spawn({ timeout: -1 });