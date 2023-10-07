const fs = require('fs');

const registerEvents = (client) => {
    const folders = fs.readdirSync('./Events')
    for (const folder of folders) {
        const eventFiles = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../Events/${folder}/${file}`);
            try {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
                console.log(`Loaded ${event.name} Event`)
            } catch (e) {
                console.warn(e)
            }

        }
    }

};

module.exports = registerEvents;