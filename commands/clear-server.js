// Import necessary libraries
const { Permissions } = require('discord.js');

// Define the command
exports.run = async (client, message, args) => {
    // Check if the member is the owner of the server
    if (message.author.id !== message.guild.ownerID) {
        return message.channel.send(':x: Only the server owner can clear the server.');
    }

    // Confirm with the user before proceeding
    message.channel.send(':warning: This command will clear all channels, roles, and settings. Do you want to continue? Send `-confirm` or `cancel`!');

    // Create a message collector to await user confirmation
    const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
        time: 60000,  // Set a timeout of 60 seconds
        max: 1  // Allow only one response
    });

    // Handle collected messages
    collector.on('collect', async (m) => {
        const confirm = m.content === '-confirm';
        collector.stop();
        if (confirm) {
            try {
                // Inform that the server clearing process is starting
                await message.channel.send('Clearing server, please wait...');

                // Delete all channels
                await Promise.all(message.guild.channels.cache.map(async (channel) => {
                    try {
                        await channel.delete();
                    } catch (error) {
                        console.error(`Error deleting channel ${channel.name}:`, error.message);
                    }
                }));

                // Delete all roles
                await Promise.all(message.guild.roles.cache.map(async (role) => {
                    try {
                        await role.delete();
                    } catch (error) {
                        console.error(`Error deleting role ${role.name}:`, error.message);
                    }
                }));

                // Notify the user about the server clearing
                return message.channel.send(':white_check_mark: Server cleared successfully!');
            } catch (error) {
                // Handle errors
                console.error('Error clearing server:', error.message);
                return message.channel.send(':x: An error occurred while clearing the server.');
            }
        } else {
            // Notify the user about the cancellation
            return message.channel.send(':x: Server clearing cancelled.');
        }
    });

    // Handle the end of the message collector
    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            return message.channel.send(':x: Command timed out! Please retry if you still want to clear the server.');
        }
    });
};
