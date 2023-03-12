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

// // Constructs path to the commands directory
// const commandsPath = path.join(__dirname, './commands');
// // Reads the path to the directory and returns an array of all the file names it contains
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Loop over the array and dynamically set each command into the client.commands Collection
// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
//     // For each file being loaded, check that it has at least the data and execute properties.
// 	if ('data' in command && 'execute' in command) {
//         // Set a new item in the Collection with the key as the command name and the value as the exported module
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }

// /*
//    For an explanation on the code for creating the event handler below, see:
//    https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files:~:text=12%0A13%0A14-,The%20Client,will%20automatically%20retrieve%20and%20register%20it%20whenever%20you%20restart%20your%20bot.,-TIP
// */

// // Constructs path to events directory
// const eventsPath = path.join(__dirname, './events');
// // Reads the path to the directory and returns an array of all the file names it contains
// const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// // Loop over the array and dynamically set each command into the client.commands Collection
// for (const file of eventFiles) {
// 	const filePath = path.join(eventsPath, file);
// 	const event = require(filePath);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args));
// 	} else {
// 		client.on(event.name, (...args) => event.execute(...args));
// 	}
// }

// Log in to Discord with your client's token
client.login(discord_token);