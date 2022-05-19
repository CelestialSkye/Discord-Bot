const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde o ping do bot!'),
    async execute(interaction) {
        interaction.reply({ content: 'Pong' })
    }
};