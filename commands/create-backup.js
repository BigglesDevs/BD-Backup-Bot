// Import the 'discord-backup' library and the bot configuration
const backup = require('discord-backup');
const config = require('../config.json');

// Define the command
exports.run = async (client, message, args) => {

    // Check if the member has the 'MANAGE_MESSAGES' permission
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    // Inform that the backup creation process is starting
    message.channel.send('Creating backup, please wait...');

    // Create a backup of the current guild (server)
    backup.create(message.guild).then((backupData) => {

        // Send a success message with the backup ID and instructions
        return message.channel.send(`Backup created! Here is your ID: \`${backupData.id}\`! Use \`${config.prefix}load-backup ${backupData.id}\` to load the backup on another server!`);

    }).catch(() => {

        // Handle errors during the backup creation process
        return message.channel.send(':x: An error occurred, please check if the bot is an administrator!');

    });

};
