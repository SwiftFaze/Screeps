const Structures = require('./structures')
const Settings = require('./settings')

function run() {
    let terminal;

    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        terminal = Structures.getClosestEnergyStructure(creep, STRUCTURE_TERMINAL);

        if (room.name !== Settings.TARGET_TERMINAL_TRANSFER_ROOM) {

            if (terminal.store[RESOURCE_ENERGY] > Settings.TERMINAL_ENERGY_TRANSFER_THRESHOLD) {

                room.terminal.send(RESOURCE_ENERGY,
                    Settings.TERMINAL_ENERGY_TRANSFER_THRESHOLD,
                    Settings.TARGET_TERMINAL_TRANSFER_ROOM,
                    'Targeted energy transfer');


            }


        }

    }

}


module.exports = {run};
