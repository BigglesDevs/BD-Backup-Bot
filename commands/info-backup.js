const backup = require('discord-backup');

exports.run = async (client, message, args) => {
    const backupID = args.join(' ');
    if (!backupID) {
        return message.channel.send(':x: Please specify a valid backup ID!');
    }

    backup.fetch(backupID).then((backupData) => {
        const date = new Date(backupData.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(),
              mm = (date.getMonth() + 1).toString(),
              dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;

        const embed = {
            color: 0x3498db, // Blue color for info
            title: 'ℹ️ **Backup Information**',
            description: `Here is the information for the backup with ID: \`${backupID}\``,
            thumbnail: {
                url: backupData.data.iconURL,
            },
            fields: [
                {
                    name: '🔹 **Server Name**',
                    value: backupData.data.name,
                    inline: true,
                },
                {
                    name: '🔹 **Size**',
                    value: `${backupData.size} KB`,
                    inline: true,
                },
                {
                    name: '🔹 **Created At**',
                    value: formattedDate,
                    inline: true,
                },
                {
                    name: '🔹 **Channels**',
                    value: `${backupData.data.channels.length}`,
                    inline: true,
                },
                {
                    name: '🔹 **Members**',
                    value: `${backupData.data.members.length}`,
                    inline: true,
                },
            ],
            footer: {
                text: `Backup ID: ${backupData.id} | Created by BigglesDevelopment 💖`,
            },
            timestamp: new Date(),
        };

        return message.channel.send({ embed: embed });

    }).catch(() => {
        const errorEmbed = {
            color: 0xFF0000, // Red for errors
            description: ':x: No backup found for the ID `' + backupID + '`!',
        };
        return message.channel.send({ embed: errorEmbed });
    });
};
