const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde to a ping!'),
    async execute(interaction) {
        interaction.reply({ content: 'Pong!' })
    }
};