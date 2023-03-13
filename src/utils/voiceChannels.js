// Import required modules
const { Guild } = require('discord.js');

/**
 * Returns a Map containing the names and ids of all voice channels in the specified guild.
 * @param {Guild} guild - The guild to retrieve the voice channels from.
 * @returns {Map<string, string>} - A Map containing the names and ids of all voice channels in the guild.
 */
function getVoiceChannels(guild) {
  const voiceChannels = new Map();

  // Filter out the voice channels
  const filteredGuildChannels = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE');

  // Add the voice channels to the Map
  filteredGuildChannels.forEach(channel => {
    voiceChannels.set(channel.name, channel.id);
  });

  return voiceChannels;
}

module.exports = { getVoiceChannels };