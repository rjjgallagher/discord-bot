const fs = require('node:fs')
const path = require('node:path')
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { discord_token } = require('../config.json');

// Require .env file for discord token.
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
] });

// Attaching commands property to client instance so that we can access our commands in other files
client.commands = new Collection();

// Constructs path to the commands directory
const commandsPath = path.join(__dirname, './commands');
// Reads the path to the directory and returns an array of all the file names it contains
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Loop over the array and dynamically set each command into the client.commands Collection
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
    // For each file being loaded, check that it has at least the data and execute properties.
	if ('data' in command && 'execute' in command) {
        // Set a new item in the Collection with the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return; // https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files:~:text=1%0A2%0A3-,Not%20every%20interaction%20is%20a%20slash%20command%20(e.g.%20MessageComponent,.,-client.on
    
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token
client.login(discord_token);