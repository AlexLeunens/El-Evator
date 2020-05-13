function displayVoiceChannels(serverChannels) {
    serverChannels.forEach(chan => {
        if (chan.type === "voice") {
            console.log(chan.name);
        }
    });
}

module.exports = {
    displayVoiceChannels,
}


