const { Events } = require('discord.js');

module.exports = {
    // The name property states which event this file is for
	name: Events.InteractionCreate,
    // The execute function holds your event logic, which will be called by the event handler whenever the event emits
	async execute(interaction, client) {
		if (interaction.isChatInputCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName)
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: `Something went wrong while executing this command...`,
					ephemeral: true,
				})
			}
		}
	},
};