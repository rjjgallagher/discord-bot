const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bots ping between itself and Discords API."),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API Latency: ${client.ws.ping}ms\nBot Reply Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
