const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsPath = path.join(__dirname, "../../commands");
    console.log(`Loading commands from: ${commandsPath}`);

    // Check if the commands directory exists
    if (!fs.existsSync(commandsPath)) {
      console.error(`Commands directory not found at path: ${commandsPath}`);
      return;
    }

    // Read the command folders in the 'commands' directory
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
      const folderPath = path.join(commandsPath, folder);

      // Check if the folder path exists and is a directory
      if (
        !fs.existsSync(folderPath) ||
        !fs.lstatSync(folderPath).isDirectory()
      ) {
        console.error(`Folder not found or is not a directory: ${folderPath}`);
        continue;
      }

      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        // Ensure each command has 'data' and 'execute' properties
        if ("data" in command && "execute" in command) {
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN
    );

    try {
      console.log(
        `Started refreshing ${client.commandArray.length} application (/) commands.`
      );

      // Refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: client.commandArray }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error("Error updating commands:", error);
    }
  };
};
