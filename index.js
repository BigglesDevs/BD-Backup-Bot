const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) return console.error("Error reading 'events' directory:", err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`✅ Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error("Error reading 'commands' directory:", err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`✅ Command loaded: ${commandName}`);
    });
});

client.login(config.token);