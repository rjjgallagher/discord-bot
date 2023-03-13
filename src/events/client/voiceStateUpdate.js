const { VoiceState } = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState) {
      const guild = newState.guild;
  
      // Only update if the user was previously in a voice channel and has now joined or left a voice channel
      if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
        // Get the new channel's members
        let members = guild.channels.cache.get(newState.channelId)?.members?.filter(member => !member.user.bot);
  
        // Store the members in a map with the guild ID and channel ID as keys
        client.voiceMembersCache.set(`${guild.id}-${newState.channelId}`, members);
        console.log(`Logging new newState.channelId: ${newState.channelId}`)
      }
    },
  };
