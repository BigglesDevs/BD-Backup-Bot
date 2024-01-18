// Define the command
exports.run = async (client, message, args) => {
    // Create an embed for the help command
    const helpEmbed = {
        color: 0x3498db, // Set the embed color
        title: 'Backup Command Help', // Set the title of the embed
        description: 'Create and load server backups with this command.', // Set the main description of the embed
        fields: [
            {
                name: 'Create Backup', // Field name
                value: '`b!create-backup` - Creates a backup of the server.', // Field value
            },
            {
                name: 'Load Backup', // Field name
                value: '`b!load-backup [backupID]` - Loads a server backup using the provided backup ID.', // Field value
            },
            {
                name: 'Backup Info ', // Field name (note the extra space for formatting)
                value: '`b!info-backup [backupID]` - Shows information of a backup', // Field value
            },
            {
                name: 'Bot information', // Field name (note the extra space for formatting)
                value: '`b!bot-info` - Shows information of a backup', // Field value
            },
            {
                name: 'Command Usage', // Field name
                value: 'Make sure to have `ADMINISTRATOR` permissions to use these commands.', // Field value
            },
        ],
        footer: {
            text: 'Bot created by BigglesDevelopment', // Set the footer text
        },
    };

    // Send the help embed to the channel
    message.channel.send({ embed: helpEmbed });
};
