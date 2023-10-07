const { ApplicationCommandType } = require("discord.js")
module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with Pong!',
        type: ApplicationCommandType.ChatInput,
    },
    run: async (client, interaction) => {
        await interaction.reply('Pong!');
    },
};