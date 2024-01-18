// Define the command
exports.run = async (client, message, args) => {
    // Create an embed for bot information
    const infoEmbed = {
        color: 0x3498db, // Set the embed color
        title: 'Bot Information', // Set the title of the embed
        fields: [
            {
                name: 'Creator', // Field name
                value: 'BigglesDevelopment', // Field value (Replace with the actual creator's name or tag)
                inline: true, // Set to inline for side-by-side display
            },
            {
                name: 'Description', // Field name
                value: 'Your bot is a helpful and fun Discord bot designed to enhance your server experience. It can perform various tasks, including creating and loading server backups. Use `b!help` to see available commands.', // Field value
            },
            {
                name: 'Version', // Field name
                value: '1.0.0', // Field value (Replace with your bot's version)
                inline: true, // Set to inline for side-by-side display
            },
            {
                name: 'Library', // Field name
                value: 'Discord.js', // Field value
                inline: true, // Set to inline for side-by-side display
            },
            {
                name: 'Server Count', // Field name
                value: client.guilds.cache.size, // Field value (Number of servers the bot is in)
                inline: true, // Set to inline for side-by-side display
            },
            {
                name: 'Invite Link', // Field name
                value: '[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=1153748095679602768&permissions=8&scope=bot)', // Field value (Replace with your bot's invite link)
            },
        ],
        footer: {
            text: 'Bot created by BigglesDevelopment', // Set the footer text
        },
    };

    // Send the bot information embed to the channel
    message.channel.send({ embed: infoEmbed });
};
