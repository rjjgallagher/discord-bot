const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wheel-of-dab")
    .setDescription(
      "Mention a random user from the current voice channel for blinkerton"
    ),
  async execute(interaction, client) {
    // Get the voice channel that the user is currently in
    const voiceChannel = interaction.member.voice.channel;

    // If the user is not in a voice channel, send an error message
    if (!voiceChannel) {
      return interaction.reply({
        content: "You need to join a voice channel first!",
        ephemeral: true,
      });
    }

    try {
      // Fetch the latest list of members from the server
      await voiceChannel.members.fetch();

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
        `Time for <@${randomMember.user.id}> to go to Penjamin City!`
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
