const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('roles')
      .setDescription('Print all the roles in the server'),
  
    async execute(interaction, client) {
      // Get the guild object from the interaction
      const guild = interaction.guild;
  
      // Get the list of role names
      const roleNames = guild.roles.cache.map(role => role.name);
  
      // Print the list of role names
      await interaction.reply(`Here are all the roles in this server: ${roleNames.join(', ')}`);
    },
  };