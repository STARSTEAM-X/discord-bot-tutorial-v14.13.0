const { ApplicationCommandType } = require("discord.js")
module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with Pong!',
        type: ApplicationCommandType.ChatInput,
        cooldown: 3000,
        // options: [
        //     {
        //         name: '',
        //         description: '',
        //         type: 3,
        //         required: true,
        //     },
        // ]
    },
    run: async (client, interaction) => {
        await interaction.reply('Pong!');
    },
};