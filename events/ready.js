module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    // Set the bot's status
    client.user.setPresence({
        activity: {
            name: '!help to get started',
            type: 'PLAYING' // You can change this to 'WATCHING', 'LISTENING', or 'STREAMING'
        },
        status: 'online' // You can change this to 'dnd' (do not disturb), 'idle', or 'invisible'
    });
};
