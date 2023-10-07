const mongoose = require('mongoose');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        const MongoUrl = client.settings.get('MongoUrl')

        if (MongoUrl) {
            mongoose.connect(MongoUrl).then(() => {
                console.log('Database connected');
            }).catch(err => {
                console.error('Error connecting to the database:', err);
            });
        }
    },
};