const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge up to 99 messages.')
        .addNumberOption(opt => 
            opt.setName('nummessages')
                .setDescription('Number of messages to delete')
                .setRequired(true)
        ),
    async execute(interaction) {
        const numMessages = interaction.options.getNumber('nummessages');

        if (numMessages > 100 || numMessages < 1) {
            return await interaction.reply({
                content: 'You must specify a number between 1 and 100.',
                ephemeral: true, 
            });
        }

        try {
            const deletedMessages = await interaction.channel.bulkDelete(numMessages, true); // `true` ignores messages older than 14 days

            await interaction.reply({
                content: `Successfully deleted ${deletedMessages.size} message(s).`,
                ephemeral: true, 
            });
        } catch (error) {
            console.error('Error deleting messages:', error);
            await interaction.reply({
                content: 'An error occurred while trying to delete messages. Please ensure I have the correct permissions.',
                ephemeral: true,
            });
        }
    }
};
