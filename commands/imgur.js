const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Config = require('../config/bot.json');
const { ImgurClient } = require('imgur');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imgur')
        .setDescription('Upload an image to imgur!')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('URL of the image (optional)')
                .setRequired(false))  
        .addAttachmentOption(option => 
            option.setName('image')
                .setDescription('Attach an image to upload (optional)')
                .setRequired(false)),  

    async execute(interaction, client) {

        const client2 = new ImgurClient({
            accessToken: Config.ACCESS_TOKEN
        });

        
        const imagemurl = interaction.options.getString('url');
        const attachment = interaction.options.getAttachment('image');

        if (imagemurl && (imagemurl.includes('.png') || imagemurl.includes('.jpg') || imagemurl.includes('.jpeg') || imagemurl.includes('.gif'))) {
            try {
                const resposta = await client2.upload({
                    image: imagemurl,
                    title: 'Imgur Bot Upload',
                    description: 'Image automatically uploaded by: Bot',
                });

                const resultados = resposta.data;

                const embed = new MessageEmbed()
                    .setColor('#7121cc')
                    .setAuthor({ name: 'Imgur.com' })
                    .setDescription(`***Your upload is complete!***\n\n**Link ->** ${resultados.link}\n`)
                    .setImage(resultados.link) // add a button for quick copy to clipboard
                    .setFooter({ text: `Imgur Bot - Alpha Version` });

                await interaction.reply({ ephemeral: false, embeds: [embed] });

            } catch (error) {
                return interaction.reply({
                    content: `Failed to upload image from URL: ${error.message}`,
                    ephemeral: true,
                });
            }
        }
        else if (attachment && attachment.contentType.startsWith('image/')) {
            // If attachment is provided (image pasted/uploaded)
            try {
                const resposta = await client2.upload({
                    image: attachment.url,
                    title: 'Imgur Bot Upload',
                    description: 'Image automatically uploaded by: Bot',
                });

                const resultados = resposta.data;

                const embed = new MessageEmbed()
                    .setColor('#7121cc')
                    .setAuthor({ name: 'Imgur.com' })
                    .setDescription(`***Your upload is complete!***\n\n**Link ->** ${resultados.link}\n`)
                    .setImage(resultados.link)
                    .setFooter({ text: `Imgur Bot - Alpha Version` });

                await interaction.reply({ ephemeral: false, embeds: [embed] });

            } catch (error) {
                return interaction.reply({
                    content: `Failed to upload attached image: ${error.message}`,
                    ephemeral: true,
                });
            }
        } else {
            return interaction.reply({
                content: 'Please provide a valid image URL or attach/paste an image to upload.',
                ephemeral: true,
            });
        }
    }
};
