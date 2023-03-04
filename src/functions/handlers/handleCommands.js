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
                console.log(`Command: ${command.data.name} has been passed through the handler`);
            }
        }
    }
}