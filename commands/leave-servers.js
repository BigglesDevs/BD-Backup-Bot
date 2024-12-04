const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ':x: You need to have the **ADMINISTRATOR** permission to make the bot leave servers.'
            }
        });
    }

    const guilds = client.guilds.cache.map(guild => guild.name);
    if (guilds.length === 0) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ':x: The bot is not currently in any servers.'
            }
        });
    }

    const serversList = guilds.join('\n');
    const embed = {
        color: 0xFFCC00,
        title: '⚙️ **List of Servers the Bot is in**',
        description: `The bot is currently in the following servers:\n\n${serversList}\n\nType \`-leave <serverName>\` to leave a server or \`-leave all\` to have the bot leave all servers.`,
        footer: {
            text: 'Type the server name exactly as shown to leave the server.'
        }
    };

    message.channel.send({ embed });

    const filter = (m) => m.author.id === message.author.id && (m.content.startsWith('-leave ') || m.content === '-leave all');
    const collector = message.channel.createMessageCollector(filter, {
        time: 60000,
        max: 1
    });

    collector.on('collect', async (m) => {
        const selection = m.content.split(' ').slice(1).join(' ');
        if (selection === 'cancel') {
            const cancelledEmbed = {
                color: 0xFF0000,
                description: ':x: **Cancelled.**'
            };
            return message.channel.send({ embed: cancelledEmbed });
        }

        if (selection === 'all') {
            for (const guild of client.guilds.cache.values()) {
                await guild.leave();
                console.log(`Bot left the server: ${guild.name}`);
                message.channel.send({
                    embed: {
                        color: 0x2ECC71,
                        description: `:white_check_mark: The bot has left the server **${guild.name}**.`
                    }
                });
            }
            return message.channel.send({ embed });
        }

        const serverToLeave = client.guilds.cache.find(guild => guild.name.toLowerCase() === selection.toLowerCase());
        if (serverToLeave) {
            await serverToLeave.leave();
            const successEmbed = {
                color: 0x2ECC71,
                description: `:white_check_mark: The bot has left the server **${serverToLeave.name}**.`
            };
            if (serverToLeave.id !== message.guild.id) {
                message.channel.send({ embed: successEmbed });
            }

            const updatedGuilds = client.guilds.cache.map(guild => guild.name);
            if (updatedGuilds.length === 0) {
                return message.channel.send({
                    embed: {
                        color: 0xFF0000,
                        description: ':x: The bot is not currently in any servers.'
                    }
                });
            }
            const updatedServersList = updatedGuilds.join('\n');
            const updatedEmbed = {
                color: 0xFFCC00,
                title: '⚙️ **List of Servers the Bot is in**',
                description: `The bot is currently in the following servers:\n\n${updatedServersList}\n\nType \`-leave <serverName>\` to leave a server or \`-leave all\` to have the bot leave all servers.`,
                footer: {
                    text: 'Type the server name exactly as shown to leave the server.'
                }
            };
            message.channel.send({ embed: updatedEmbed });
        } else {
            const errorEmbed = {
                color: 0xFF0000,
                description: ':x: **Invalid server name!** Please provide a valid server name from the list.'
            };
            message.channel.send({ embed: errorEmbed });
        }
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            const timeoutEmbed = {
                color: 0xFF0000,
                description: ':x: **Command timed out!** Please retry.'
            };
            message.channel.send({ embed: timeoutEmbed });
        }
    });
};