<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1171503036800184362/1197476836247080980/Untitled-1.png?ex=65bb6835&is=65a8f335&hm=56a57384eb200fc9bf3fc3f1006173566b09d09607cf5eaad80e0a16cdbfce71&" alt="Discord Backup Bot" width="300"/>
</p>

[![Node.js](https://img.shields.io/badge/Node.js-latest-brightgreen)](https://nodejs.org/)
[![ECMAScript Version](https://img.shields.io/badge/ECMAScript-2023-yellow)](https://www.ecma-international.org/ecma-262/12.0/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# Discord Backup Bot 🤖🔒

A Discord bot with backup functionality using discord-backup.

## Features

- **Backup Creation:** Create a backup of your server with all channels, roles, and settings included.
- **Backup Loading:** Load a previously created backup onto your server.
- **Backup Information:** View information about a specific backup, including creation date and size.
- **Bot Inofrmation:** View some information on the bot if you really need too.
- **Help Command:** View all avaliable commands (Adminstrator+).

## Installation 🔽

1. Clone the repository: `git clone https://github.com/BigglesDevs/BD-Backup-Bot.git`
2. Install dependencies: `npm install`

## Setup 📐

1. Remove the  `config.json` file based on `config.json.example` and fill in the necessary information (token, prefix, etc.).
2. Start the bot: `npm start`

## Command Usage 🤖

Here are the commands for the bot. You must have ADMINISTRATOR permissions to use these commands.

1. `b!create-backup`
2. `b!load-backup [backupID]`
3. `b!info-backup [backupID]`
4. `b!bot-info`
5. `b!help`

## Contributing 🚀

If you'd like to contribute, please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Description of your changes'`
5. Push to the branch: `git push origin feature-name`
6. Open a pull request

## License 📝

This project is licensed under the [MIT License](LICENSE).
