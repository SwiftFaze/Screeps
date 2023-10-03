const Structures = require("./structures");


function run() {
    for (var roomName in Game.rooms) {

        var myRoom = Game.rooms[roomName];

        if (myRoom.controller && myRoom.controller.level === 8 && myRoom.controller.my) {
            var exits = Game.map.describeExits(roomName);

            var observer = myRoom.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_OBSERVER;
                }
            });

            for (var direction in exits) {
                if (exits.hasOwnProperty(direction)) {
                    if (observer.length !== 0) {
                        var nextRoom = observer[0].observeRoom(Structures.getClaimFlag());
                    }
                }
            }
        }
    }


}


module.exports = {run};
