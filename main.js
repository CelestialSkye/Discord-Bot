const fs = require('fs');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const Cluster = require('discord-hybrid-sharding');
const {
    Client,
    Intents,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js');
const Config = require('./config/bot.json');
const c = require('colors');

const client = new Client({
    intents: 32767,
    shards: Cluster.data.SHARD_LIST, 
    shardCount: Cluster.data.TOTAL_SHARDS,
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Development = Config.GUILD_TEST;
const commands = [];

// Criando uma coleção para comandos no client
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.once('ready', () => {
    // Registrando os comandos no client id
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(Config.token);
    (async () => {
        try {
            if (!Development) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log(c.red('[GLOBAL]')+' Comandos em barra registrados com sucesso!');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, Development), {
                        body: commands
                    },
                );
                console.log(c.red('[DEVELOPMENT]')+' Comandos em barra registrados com sucesso!');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({
            content: 'Ocorreu um erro na execução do comando!',
            ephemeral: true
        });
    }
});

client.cluster = new Cluster.Client(client);
client.login(Config.token);