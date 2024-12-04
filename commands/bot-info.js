exports.run = async (client, message, args) => {
    const infoEmbed = {
        color: 0x3498db, // Blue for information
        title: '🤖 **Bot Information**',
        fields: [
            {
                name: '📝 **Description**',
                value: 'A helpful and fun Discord bot designed to enhance your server experience. It can perform various tasks, such as creating and loading server backups. Use `bd!help` to see available commands.',
                inline: false,
            },
            {
                name: '📦 **Version**',
                value: '2.6.3',
                inline: true,
            },
            {
                name: '📚 **Library**',
                value: 'Discord.js',
                inline: true,
            },
            {
                name: '🌍 **Server Count**',
                value: `${client.guilds.cache.size} servers`,
                inline: true,
            },
            {
                name: '🔗 **Invite Link**',
                value: '[Invite Bot](https://discord.com/oauth2/authorize?client_id=1153748095679602768)',
                inline: false,
            },
            {
                name: '👨‍💻 **Bot Developer**',
                value: 'BigglesDevelopment 💖',
                inline: true,
            },
        ],
        footer: {
            text: 'Backup System | Created by BigglesDevelopment 💖',
        },
        timestamp: new Date(),
    };

    message.channel.send({ embed: infoEmbed });
};
