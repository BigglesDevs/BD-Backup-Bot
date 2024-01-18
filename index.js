// Import the 'fs' module for file system operations
const fs = require('fs');

// Import the 'Discord.js' library
const Discord = require('discord.js');

// Create a new instance of the Discord client
const client = new Discord.Client();

// Load the configuration file (config.json)
const config = require('./config.json');
client.config = config;

/* Load all events */

// Read all files in the 'events' directory
fs.readdir("./events/", (err, files) => {
    if (err) return console.error("Error reading 'events' directory:", err);

    // Iterate through each file
    files.forEach((file) => {
        // Check if the file does not end with ".js"
        if (!file.endsWith(".js")) return;

        // Require the event file
        const event = require(`./events/${file}`);

        // Extract the event name from the file name
        let eventName = file.split(".")[0];

        // Log that the event has been loaded
        console.log(`✅ Event loaded: ${eventName}`);

        // Bind the event to the client and attach it to the event listener
        client.on(eventName, event.bind(null, client));

        // Clear the require cache to allow for hot-reloading of events
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// Create a collection to store all commands
client.commands = new Discord.Collection();

/* Load all commands */

// Read all files in the 'commands' directory
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error("Error reading 'commands' directory:", err);

    // Iterate through each file
    files.forEach((file) => {
        // Check if the file does not end with ".js"
        if (!file.endsWith(".js")) return;

        // Require the command file
        let props = require(`./commands/${file}`);

        // Extract the command name from the file name
        let commandName = file.split(".")[0];

        // Add the command to the client's commands collection
        client.commands.set(commandName, props);

        // Log that the command has been loaded
        console.log(`✅ Command loaded: ${commandName}`);
    });
});

// Login to Discord using the bot token from the configuration
client.login(config.token);
