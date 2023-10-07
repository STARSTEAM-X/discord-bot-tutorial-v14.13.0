const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

const config = require('./config.json');
const registerCommands = require('./Handlers/register_commands');
const registerEvents = require('./Handlers/register_events');

client.slashCommands = new Collection()
client.settings = new Collection()

for (let key in config) {
    const value = config[key];
    client.settings.set(key, value)
}

registerCommands(client);
registerEvents(client);

const token = client.settings.get('token');
client.login(token);