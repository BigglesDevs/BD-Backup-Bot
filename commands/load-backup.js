// Import the 'discord-backup' library
const backup = require('discord-backup');

// Define the command
exports.run = async (client, message, args) => {
    // Check if the member has the 'ADMINISTRATOR' permission
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    // Extract the backup ID from the command arguments
    const backupID = args.join(' ');

    // Fetch the backup with the provided ID
    backup.fetch(backupID).then(() => {

        // Prompt the user for confirmation
        message.channel.send(':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!');

        // Create a message collector to await user confirmation
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,  // Set a timeout of 60 seconds
            max: 1  // Allow only one response
        });

        // Handle collected messages
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                // Inform that the backup loading process is starting
                message.channel.send('Loading backup, please wait...');

                // Load the backup into the server
                backup.load(backupID, message.guild).then(() => {

                    // Notify the user about the successful backup load
                    message.channel.send(':white_check_mark: Backup loaded successfully!');
                    return message.author.send('Backup loaded successfully!');
            
                }).catch((err) => {
            
                    // Handle errors during backup loading
                    if (err === 'No backup found')
                        return message.channel.send(':x: No backup found for ID ' + backupID + '!');
                    else
                        return message.author.send(':x: An error occurred: ' + (typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                // Notify the user about the cancellation
                return message.channel.send(':x: Cancelled.');
            }
        });

        // Handle the end of the message collector
        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: Command timed out! Please retry.');
        });

    }).catch(() => {
        // Notify the user if no backup is found for the provided ID
        return message.channel.send(':x: No backup found for ID ' + backupID + '!');
    });

};
