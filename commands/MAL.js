const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const MAL_CLIENT_ID = 'd95bf353f96716ea9f001750279ac358'; // Your MAL Client ID

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mal')
        .setDescription('Search for anime on MyAnimeList!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Search for an anime')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply(); // Avoids "Unknown Interaction" error

        const target = interaction.options.getString('query');

        try {
            const url = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(target)}&limit=5&fields=id,title,main_picture,synopsis,mean,genres,num_episodes,media_type`;
            const response = await fetch(url, {
                headers: { "X-MAL-CLIENT-ID": MAL_CLIENT_ID }
            });

            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();

            if (!data || !data.data || data.data.length === 0) {
                return await interaction.editReply('No anime found. Please try again!');
            }

            // **🔹 Filter results to find the first TV series (not a movie)**
            let anime = data.data.find(a => a.node.media_type === "tv")?.node || data.data[0].node;

            const genres = anime.genres ? anime.genres.map(g => g.name).join(', ') : 'N/A';
            const synopsis = anime.synopsis ? anime.synopsis.substring(0, 500) + "..." : 'No synopsis available.';
            const rating = anime.mean ? `⭐ ${anime.mean}/10` : 'No rating available.';
            const episodes = anime.num_episodes ? `🎥 Episodes: ${anime.num_episodes}` : 'Still going.';

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(anime.title)
                .setImage(anime.main_picture ? anime.main_picture.medium : null)
                .setURL(`https://myanimelist.net/anime/${anime.id}`)
                .setDescription(`**Genres:** ${genres}\n\n${synopsis}`)
                .setFooter({ text: `${rating} | ${episodes}` });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching from MAL API:', error);
            await interaction.editReply('Failed to fetch anime from MyAnimeList.');
        }
    }
};
