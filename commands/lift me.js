const logger = require('../tools/logger.js');
const tools = require('../tools/tools.js');

const timeBetweenFloors = 2000;

module.exports = {
    name: 'lift me',
    description: 'Brings you up !',

    execute(message, args) {

        if (args.length != 2) { return; }

        const member = message.member;

        let serverChannels = message.guild.channels;

        // serverChannels = tools.sortChannelsByName(serverChannels);
        serverChannels = tools.sortChannelsByServerOrder(serverChannels);

        let channels = tools.getVoiceChannels(serverChannels);

        // logger.displayVoiceChannels(serverChannels);

        let floor = args[1];
        message.channel.send(`We're going to the ${floor}, ${member.displayName}`);

        let startingFloor = channels.findIndex(chan => chan.name == member.voiceChannel.name);
        let goalFloor = channels.findIndex(chan => chan.name == floor);

        let increment = 1;
        if (startingFloor > goalFloor) {
            increment = -1;
        }

        var i = startingFloor + increment;

        function myLoop() {
            setTimeout(function () {

                let nextChannel = channels[i];
                member.setVoiceChannel(nextChannel.id).catch(console.error);

                i+= increment;
                if (i != goalFloor + increment) {
                    myLoop();
                }
            }, timeBetweenFloors)
        }

        myLoop();
    },
};