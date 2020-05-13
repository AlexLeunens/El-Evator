const logger = require('../tools/logger.js');
const tools = require('../tools/tools.js');

const timeBetweenFloors = 5000;

module.exports = {
    name: 'lift me',
    description: 'Brings you up !',

    execute(message, args) {

        if (args.length != 2) { return; }

        const member = message.member;

        let serverChannels = message.guild.channels;
        serverChannels = tools.sortChannelsByName(serverChannels);
        let channels = tools.getVoiceChannels(serverChannels);

        // logger.displayVoiceChannels(serverChannels);

        let floor = args[1];
        message.channel.send(`We're going to the ${floor}, ${member.displayName}`);

        let startingFloor = channels.findIndex(chan => chan.name == member.voiceChannel.name);
        let goalFloor = channels.findIndex(chan => chan.name == floor);

        var i = startingFloor + 1;

        function myLoop() {
            setTimeout(function () {

                let nextChannel = channels[i];
                member.setVoiceChannel(nextChannel.id).catch(console.error);

                i++;
                if (i <= goalFloor) {
                    myLoop();
                }
            }, timeBetweenFloors)
        }

        myLoop();
    },
};