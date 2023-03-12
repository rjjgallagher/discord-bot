const fs = require('node:fs')
const path = require('node:path')
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { discord_token } = require('../config.json');

// Require .env file for discord token.
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,] });

// Attaching commands property to client instance so that we can access our commands in other files
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
	const functionFiles = fs
	.readdirSync(`./src/functions/${folder}`)
	.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client)
	}
}

client.handleEvents();
client.handleCommands();

// Log in to Discord with your client's token
client.login(discord_token);