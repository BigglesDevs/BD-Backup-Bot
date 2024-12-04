const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (message.author.id !== '676354368404193280') {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ':x: You are not authorized to use this command!'
            }
        });
    }
    const ownerHelpEmbed = {
        color: 0xFF5733,
        title: '🔒 Owner-Only Commands Help',
        description: 'These commands are exclusive to the bot owner.',
        fields: [
            {
                name: '__🛠️ Owner Command 1__',
                value: '`bd!leave-servers` - Example command for the owner.',
            }
        ],
        footer: {
            text: 'Backup System | Created by BigglesDevelopment 💖',
        },
    };
    try {
        await message.author.send({ embed: ownerHelpEmbed });
        message.channel.send({
            embed: {
                color: 0x2ECC71,
                description: ':white_check_mark: I have sent the owner commands help to your DMs!'
            }
        });
    } catch (error) {
        message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ':x: I was unable to send you a DM. Please make sure your DMs are open.'
            }
        });
    }
};
