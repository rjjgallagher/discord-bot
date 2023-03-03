const { Events } = require('discord.js');

module.exports = {
    // The name property states which event this file is for
	name: Events.InteractionCreate,
    // The execute function holds your event logic, which will be called by the event handler whenever the event emits
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};