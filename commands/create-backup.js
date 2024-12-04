const { MessageEmbed } = require('discord.js');
const backup = require('discord-backup');
const config = require('../config.json');

exports.run = async (client, message, args) => {
    backup.create(message.guild).then((backupData) => {
        const embed = {
            color: 0x2ECC71,
            title: '🔧 **Backup Created!**',
            description: 'Your backup has been successfully created! Here are the details:',
            fields: [
                {
                    name: '🆔 **Backup ID**',
                    value: `\`${backupData.id}\``,
                    inline: true,
                },
                {
                    name: '📥 **Load Backup**',
                    value: `Use \`bd!load-backup ${backupData.id}\` to load this backup on another server!`,
                    inline: false,
                },
            ],
            footer: {
                text: 'Backup System | Created by BigglesDevelopment 💖',
            },
            timestamp: new Date(),
        };
        
        return message.channel.send({ embed: embed });

    }).catch(() => {
        const errorEmbed = {
            color: 0xFF0000, // Red color for error
            description: ':x: An error occurred while creating the backup. Please check if the bot has the necessary permissions!',
        };

        return message.channel.send({ embed: errorEmbed });
    });
};
