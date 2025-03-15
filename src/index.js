const fs = require("fs");
const path = require("path");
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const connectToDatabase = require("./database/connection.js");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

connectToDatabase();

// Attaching commands property to client instance
client.commands = new Collection();
client.commandArray = [];

// Path to the functions directory
const functionsPath = path.join(__dirname, "functions");
console.log("Attempting to read from:", functionsPath);

// Check if functions directory exists
if (!fs.existsSync(functionsPath)) {
  console.error(`Functions directory not found at path: ${functionsPath}`);
  process.exit(1); // Exit if directory doesn't exist
}

// Read the functions directory for folders
const functionFolders = fs.readdirSync(functionsPath);
for (const folder of functionFolders) {
  // Check if folder is a directory
  const folderPath = path.join(functionsPath, folder);
  if (fs.lstatSync(folderPath).isDirectory()) {
    const folderFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of folderFiles) {
      const filePath = path.join(functionsPath, folder, file);
      console.log(`Loading function file: ${filePath}`);
      require(filePath)(client);
    }
  }
}

// Initialize commands and events
client.handleEvents();
client.handleCommands();

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN); 
