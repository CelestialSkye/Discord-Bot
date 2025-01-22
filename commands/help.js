const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js'); // Import MessageEmbed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Gives some useful information about the bot and its commands!'),
    async execute(interaction) {
        const embed = new MessageEmbed()
        //i need to set up the slash commands here and their descriptions
        //maybe one day i will do that
            .setColor('#3498db') 
            .setTitle('Help Command') 
            .setDescription('Here is some useful information about the bot and its commands!') 
            .setThumbnail('https://i.imgur.com/AfFp7pu.png') 
            .setFooter('Bot Help', 'https://i.imgur.com/AfFp7pu.png') 
            .setTimestamp();

        await interaction.deferReply();

        await interaction.followUp({ embeds: [embed] });
    },
};
