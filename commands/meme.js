const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js'); // Ensure it's from discord.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get random memes!'),

    async execute(interaction) {
        try {
            const response = await fetch('https://www.reddit.com/r/ShitpostXIV/top/.json?limit=50&t=all');
            const data = await response.json();

            // Check if we got valid data
            if (!data || !data.data || !data.data.children || data.data.children.length === 0) {
                return await interaction.reply('No memes found. Please try again!');
            }

            // Pick multiple random posts from the list (e.g., 3 memes)
            const memesToSend = [];
            for (let i = 0; i < 2; i++) {
                const randomPost = data.data.children[Math.floor(Math.random() * data.data.children.length)].data;

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(randomPost.title)
                    .setImage(randomPost.url)
                    .setURL(`https://www.reddit.com${randomPost.permalink}`)
                    .setFooter({ text: `🤯👍 ${randomPost.ups} 👎😨 ${randomPost.downs} | Creator: ${randomPost.author}` });

                memesToSend.push(embed);
            }

            // Send all the embeds as a reply
            await interaction.reply({ embeds: memesToSend });

        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch memes.');
        }
    }
};
