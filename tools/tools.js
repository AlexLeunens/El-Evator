function sortChannelsByName(serverChannels) {
    let result = serverChannels.sort(function (a, b) {
        return (a.name).localeCompare(b.name);
    });

    return result;
}

function getVoiceChannels(serverChannels) {
    let channels = new Array();

    serverChannels.forEach(chan => {
        if (chan.type === "voice") {
            channels.push(chan);
        }
    });

    return channels;
}

module.exports = {
    sortChannelsByName,
    getVoiceChannels,
}