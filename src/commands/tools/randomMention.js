const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wheel-of-dab")
    .setDescription(
      "Mention a random user from the current voice channel for blinkerton"
    ),
  async execute(interaction, client) {
    const voiceState = interaction.member.voice;

    // If the user is not in a voice channel, send an error message
    if (!voiceState.channel) {
      return interaction.reply({
        content: "You need to join a voice channel first!",
        ephemeral: true,
      });
    }

    try {
      // Gets the users voice channel
      const voiceChannel = await client.channels.fetch(voiceState.channelId);

      // Get an array of users in the voice channel (excluding bots)
      const voiceMembers = voiceChannel.members.filter(
        (member) => !member.user.bot
      );

      // If there are no users in the voice channel (excluding bots), send an error message
      if (!voiceMembers.size) {
        return interaction.reply({
          content: "There are no other users in your voice channel!",
          ephemeral: true,
        });
      }

      // Pick a random user from the voice channel
      const randomMember = voiceMembers.random();

      // Mention the random user
      return interaction.reply(
        `Flight arrival for <@${randomMember.user.id}> headed towards Penjamin City`
      );
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content:
          "There was an error fetching the list of members. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
