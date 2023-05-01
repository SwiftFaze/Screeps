const room = require('src/main/room')
const creep = require('src/main/creep')


// class GameMemory {
//     version
//     debugActivated
// }


function updateMemory() {


    Memory.rooms = Memory.rooms || {};
    Memory.sources = Memory.sources || {};

    updateRoomMemory()


    garbageCollection();

}


global.isDebugMode = function () {
    // const gameMemory = getGameMemory();
    // return gameMemory.debugActivated
};

function updateRoomMemory() {

    room.getRoomList().forEach(room => {


        if (!Game.rooms[room]) {
            delete Memory.rooms[room];
        } else {

            Memory.rooms[room] = Game.rooms[room]
            let sources = Game.rooms[room].find(FIND_SOURCES)
            let roomSourceList = []
            for (var i = 0; i < sources.length; i++) {
                roomSourceList.push(sources[i].id)


            }
            Game.rooms[room]["sourceList"] = roomSourceList


        }


    })

    initSources()


}


function initSources() {

    // Loop through all rooms
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];

        // Find all sources in the room
        var sources = room.find(FIND_SOURCES);

        // Initialize the sources in the Memory object
        for (var i in sources) {
            var source = sources[i];
            Memory.sources[source.id] = 0;
        }
    }

    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        if (creep.memory.sourceId !== null) {
            Memory.sources[creep.memory.sourceId] = Memory.sources[creep.memory.sourceId] + 1

        }
    }


}


function clearCreepMemory() {
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}

function clearSourceMemory() {
    for (var sourceName in Memory.sources) {
        for (var roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            const foundSource = room.find(FIND_SOURCES, {
                filter: {id: sourceName}
            });
            if (!foundSource.length) {
                delete Memory.sources[sourceName];
            }
        }
    }
}

function garbageCollection() {
    clearCreepMemory()
    clearSourceMemory()


    for (var x in Game.spawns) {
        creep.resetTransporterLinks(Game.spawns[x])
    }


}

module.exports = {updateMemory};
