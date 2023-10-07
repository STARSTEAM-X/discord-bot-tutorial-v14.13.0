const { ApplicationCommandType } = require("discord.js")
module.exports = {
    data: {
        name: 'clear',
        description: 'Replies with Pong!',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'amount',
                description: 'The number of messages to clear (1-100)',
                type: 4, // Type 4 is for integers
                required: true
            },
            {
                name: 'target',
                description: 'Select a user to clear messages from (optional)',
                type: 6, // Type 6 is for users
                required: false
            }
        ],
    },
    run: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
                return interaction.reply("You don't have permission to use this command.");
            }

            const amount = interaction.options.getInteger("amount");
            const targetUser = interaction.options.getUser("target");

            interaction.reply(`Cleared ${amount} messages.`);

            if (amount < 1 || amount > 100) {
                return interaction.reply("Please provide a valid amount (1-100).");
            }

            const filter = targetUser ? (msg) => msg.author.id === targetUser.id : undefined;

            const messages = await interaction.channel.messages.fetch({ limit: amount });
            const messagesToDelete = filter ? messages.filter(filter) : messages;

            for (const message of messagesToDelete.values()) {
                await message.delete().catch(error => {
                    console.error("Error deleting a message:", error);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            interaction.reply("An error occurred while clearing messages.");
        }
    }
};