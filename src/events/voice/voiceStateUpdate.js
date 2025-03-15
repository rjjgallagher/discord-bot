const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const userTag = newState.member?.user.tag || oldState.member?.user.tag;

        // User joins a voice channel
        if (!oldState.channel && newState.channel) {-
            console.log(`🎤 ${userTag} joined voice channel: ${newState.channel.name}`);
        }

        // User leaves a voice channel
        else if (oldState.channel && !newState.channel) {
            console.log(`🔇 ${userTag} left voice channel: ${oldState.channel.name}`);
        }

        // User switches voice channels
        else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            console.log(`🔄 ${userTag} switched from ${oldState.channel.name} to ${newState.channel.name}`);
        }
    }
};
