const { discord_token, clientId, guildId } = require('../../../config.json');
const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            const {commands, commandArray} = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);

                // For each file being loaded, check that it has at least the data and execute properties.
                if ('data' in command && 'execute' in command) {
                    // Set a new item in the Collection with the key as the command name and the value as the exported module
                    commands.set(command.data.name, command);
                    commandArray.push(command.data.toJSON());
                } else {
                    const commandsPath = path.join(__dirname, './commands');
                    const filePath = path.join(commandsPath, file);
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }

        // Construct and prepare an instance of the REST module
        const rest = new REST({ version: '10' }).setToken(discord_token);
        try {
            console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), { 
                    body: client.commandArray, 
                });
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // catch and logs any errors
            console.error(error);
        }
    }
}