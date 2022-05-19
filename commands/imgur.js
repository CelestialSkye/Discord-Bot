const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js');
const Config = require('../config/bot.json');
const {
    ImgurClient
} = require('imgur');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imgur')
        .setDescription('Envia uma imagem para o imgur!')
        .addStringOption(option => option.setName('url').setDescription('url').setRequired(true)),
        
    async execute(interaction, client) {

        const client2 = new ImgurClient({
            accessToken: Config.ACCESS_TOKEN
        });

        const imagemurl = interaction.options.getString('url');

        if (!imagemurl.includes('.png' || '.jpg')) {
            return interaction.reply({
                content: `${interaction.user} tu não forneceu um link teu bosta!`,
                ephemeral: true,
            })
        }

        const resposta = await client2.upload({
            image: imagemurl,
            title: 'Imgur Bot Upload',
            description: 'Imagem enviada automaticamente por: Bot Upload',
        });

        const resultados = resposta.data;

        const embed = new MessageEmbed()
            .setColor('#7121cc')
            .setAuthor({
                name: 'Imgur.com'
            })
            .setDescription(`***O seu upload foi concluído!***\n\n**Link ->** ${resultados.link}\n`)
            .setImage(resultados.link)
            .setFooter({
                text: `Imgur Bot - Alpha Version`
            })

        await interaction.reply({
            ephemeral: true,
            embeds: [embed]
        })
    }
};