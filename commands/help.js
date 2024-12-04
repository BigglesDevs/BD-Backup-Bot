const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const helpEmbed = {
        color: 0x3498db,
        title: '🔧 BD-Backupbot Commands Help',
        description: 'Create and load server backups with these commands.',
        fields: [
            {
                name: '__📝 Create Backup__',
                value: '`bd!create-backup` - Creates a backup of the server.',
            },
            {
                name: '__🔄 Load Backup__',
                value: '`bd!load-backup [backupID]` - Loads a server backup using the provided backup ID.',
            },
            {
                name: '__ℹ️ Backup Info__',
                value: '`bd!info-backup [backupID]` - Shows information of a backup.',
            },
            {
                name: '__🤖 Bot Information__',
                value: '`bd!bot-info` - Shows information about the bot.',
            },
            {
                name: '__⚠️ Command Usage__',
                value: 'Make sure to have `ADMINISTRATOR` permissions to use these commands.',
            },
        ],
        footer: {
            text: 'Developed by BigglesDevelopment 💖',
        },
    };

    message.channel.send({ embed: helpEmbed });

    if (args[0] === 'ownercommandhelp') {
        if (message.author.id === '676354368404193280') {
            const ownerHelpEmbed = {
                color: 0xFF5733,
                title: '🔒 Owner-Only Commands Help',
                description: 'These commands are exclusive to the bot owner.',
                fields: [
                    {
                        name: '__🛠️ Owner Command 1__',
                        value: '`bd!leave-servers` - Example command for the owner.',
                    },
                ],
                footer: {
                    text: 'Only available to the bot owner 💖',
                },
            };

            try {
                await message.author.send({ embed: ownerHelpEmbed });
                message.channel.send(':white_check_mark: I have sent the owner commands help to your DMs!');
            } catch (error) {
                message.channel.send(':x: I was unable to send you a DM. Please make sure your DMs are open.');
            }
        } else {
            message.channel.send(':x: You are not authorized to view the owner commands!');
        }
    }
};
