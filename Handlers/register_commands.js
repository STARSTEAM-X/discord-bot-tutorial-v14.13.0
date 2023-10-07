const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const registerCommands = async (client) => {
    const commands = [];
    const folders = fs.readdirSync(`./Commands`)
    for (const folder of folders) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            try {
                const command = require(`../Commands/${folder}/${file}`);
                commands.push(command.data);
                client.slashCommands.set(command.data.name, command);
                console.log(`Loaded ${command.data.name} Command`);
            } catch (error) {
                console.error(`Error loading command from ${folderPath}/${file}: ${error}`);
            }
        }
    }

    const token = client.settings.get('token');
    const clientId = client.settings.get('clientId');
    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

module.exports = registerCommands;