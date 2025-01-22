const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js'); // Import MessageEmbed
const Config = require('../config/bot.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('View the weather for your chosen area')
        .addStringOption(option => 
            option.setName('location')
                .setDescription('The chosen area\'s weather to show')
                .setRequired(true) // Make it required
        ),
    async execute(interaction) {
        const target = interaction.options.getString('location'); // Use getString() to get the location input
        const apiToken = Config.apiToken; // Use the token from your config file
        
        try {
            // Make the API request using fetch
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${target}&units=metric&appid=${apiToken}`);
            const apiData = await response.json(); // Parse JSON response
            
            if (apiData.cod !== 200) {
                throw new Error('Invalid city name or API error');
            }

            const currentTemp = Math.ceil(apiData.main.temp);
            const wind = apiData.wind.speed;
            const icon = apiData.weather[0].icon;
            const cityName = apiData.name;
            const country = apiData.sys.country;
            const cloudness = apiData.weather[0].description;
            const { pressure, humidity, temp_max, temp_min } = apiData.main;

            const weatherEmbed = new MessageEmbed()
                .setTitle(`The temperature is ${currentTemp}\u00B0C in ${cityName}, ${country}`)
                .addFields(
                    { name: `Maximum Temperature:`, value: `${temp_max}\u00B0C`, inline: true },
                    { name: `Minimum Temperature:`, value: `${temp_min}\u00B0C`, inline: true },
                    { name: `Humidity:`, value: `${humidity} %`, inline: true },
                    { name: `Wind Speed:`, value: `${wind} m/s`, inline: true },
                    { name: `Pressure:`, value: `${pressure} hpa`, inline: true },
                    { name: `Cloudiness:`, value: `${cloudness}`, inline: true },
                )
                .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
                .setColor("#FFC0CB");

            await interaction.reply({ embeds: [weatherEmbed] });
        } catch (err) {
            console.error(err);
            await interaction.reply('Please enter a valid city name');
        }
    },
};
