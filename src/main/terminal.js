const Settings = require('./settings')

function run() {
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        if (room.name !== Settings.TARGET_TERMINAL_TRANSFER_ROOM && room.terminal !== undefined) {
            if (room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > Settings.TERMINAL_ENERGY_TRANSFER_THRESHOLD) {

                room.terminal.send(RESOURCE_ENERGY,
                    Settings.TERMINAL_ENERGY_TRANSFER_THRESHOLD,
                    Settings.TARGET_TERMINAL_TRANSFER_ROOM,
                    'Targeted energy transfer');


            }


        }

    }

}


module.exports = {run};
