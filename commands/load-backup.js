const backup = require('discord-backup');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ':x: You need to have the **ADMINISTRATOR** permission to load a backup!',
            },
        });
    }

    const backupID = args.join(' ');
    backup.fetch(backupID).then(() => {
        const confirmEmbed = {
            color: 0xFFCC00,
            description: ':warning: All server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!',
        };
        message.channel.send({ embed: confirmEmbed });
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1,
        });

        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            
            if (confirm) {
                const loadingEmbed = {
                    color: 0x3498db,
                    description: '🔄 Loading backup, please wait...',
                };
                message.channel.send({ embed: loadingEmbed });
                backup.load(backupID, message.guild).then(() => {
                    const successEmbed = {
                        color: 0x2ECC71,
                        description: ':white_check_mark: **Backup loaded successfully!**',
                    };
                    message.channel.send({ embed: successEmbed });
                    return message.author.send('Backup loaded successfully!');
                }).catch((err) => {
                    const errorEmbed = {
                        color: 0xFF0000,
                        description: `:x: An error occurred: ${typeof err === 'string' ? err : JSON.stringify(err)}`,
                    };
                    return message.channel.send({ embed: errorEmbed });
                });
            } else {
                const cancelledEmbed = {
                    color: 0xFF0000,
                    description: ':x: **Cancelled.**',
                };
                return message.channel.send({ embed: cancelledEmbed });
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                const timeoutEmbed = {
                    color: 0xFF0000,
                    description: ':x: **Command timed out!** Please retry.',
                };
                return message.channel.send({ embed: timeoutEmbed });
            }
        });
    }).catch(() => {
        const noBackupEmbed = {
            color: 0xFF0000,
            description: ':x: No backup found for ID `' + backupID + '`!',
        };
        return message.channel.send({ embed: noBackupEmbed });
    });
};