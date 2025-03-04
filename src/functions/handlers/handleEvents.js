const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsPath = path.join(__dirname, "../../events");
    console.log(`Loading events from: ${eventsPath}`);

    // Check if the events directory exists
    if (!fs.existsSync(eventsPath)) {
      console.error(`Events directory not found at path: ${eventsPath}`);
      return;
    }

    // Read the folders inside events
    const eventFolders = fs.readdirSync(eventsPath);

    for (const folder of eventFolders) {
      const folderPath = path.join(eventsPath, folder);

      // Check if the folder path is valid and exists
      if (!fs.existsSync(folderPath)) {
        console.error(`Folder not found: ${folderPath}`);
        continue;
      }

      // Read all JS files in the current folder
      const eventFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const filePath = path.join(folderPath, file);
            const event = require(filePath);

            // Attach events to the client
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;

        case "voice":
          for (const file of eventFiles) {
            const filePath = path.join(folderPath, file);
            const event = require(filePath);

            // Attach events to the client
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;

        default:
          console.warn(`Unknown event folder: ${folder}`);
          break;
      }
    }
  };
};
