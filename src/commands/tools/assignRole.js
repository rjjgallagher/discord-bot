const excludedRoles = require("../../utils/excludedRoles");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("assignrole")
    .setDescription("Assigns a role to yourself.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to assign to yourself.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // Get the role from the interaction options
    const role = interaction.options.getRole("role");

    // Check if the role is in the excluded roles array
    if (excludedRoles.includes(role.id)) {
      await interaction.reply({
        content: "You are not allowed to assign yourself this role.",
        ephemeral: true,
      });
      return;
    }

    // Add the role to the user
    try {
      await interaction.member.roles.add(role);
      await interaction.reply(`Assigned the ${role.name} role to yourself.`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "An unexpected error came up.\nFailed to assign the role to yourself.",
        ephemeral: true,
      });
    }
  },
};
