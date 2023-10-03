const Harvesters = require('./harvester')
const Builders = require('./builder')
const Upgraders = require('./upgrader')
const Transporters = require('./transporter')
const Creeps = require('./creep')
const Claimers = require('./claimer')
// const CreepComponents = require('./creepComponents')
const Settings = require('./settings')

function spawnCreep() {

    for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName]
        const creep = Creeps.createCreep(spawn);

        if (canSpawnCreep(spawn, creep)) {
            spawn.spawnCreep(creep.components.bodyParts, creep.name, {
                memory: {
                    role: creep.components.role, sourceId: setSourceId(creep, spawn)
                }
            });
        }
    }
}

function setSourceId(creep, spawn) {
    var source = getBestSource(spawn);
    var sorId = null;
    sorId = source ? source.id : null;
    if (creep.components.role === Creeps.CREEP_ROLES.HARVESTER) {
        Memory.sources[sorId] = Memory.sources[sorId] + 1;
    }
    return sorId;
}


function getBestSource(spawn) {

    var sources = spawn.room.find(FIND_SOURCES);
    var previousAssignedSource = null;
    var previousMemorySourceCount = Infinity;

    for (var i in sources) {
        var source = sources[i];

        if (sourceHasFreeSpaces(source)) {
            const memorySourceCount = Memory.sources[source.id] || 0
            if (memorySourceCount < previousMemorySourceCount) {
                previousMemorySourceCount = memorySourceCount;
                previousAssignedSource = source;
            }
        }
    }
    return previousAssignedSource;


}

function getFreeSpaces(selectedSource) {
    const source = Game.getObjectById(selectedSource.id);
    if (source.room.controller.level >= Settings.SINGLE_HARVESTER_ROOM_CONTROLLER_LEVEL) {
        return 1;
    } else {
        return source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true)
            .filter(tile => tile.terrain === "plain" || tile.terrain === "swamp").length;
    }

}

global.sourceHasFreeSpaces = function (selectedSource) {
    var assignedCreeps = Memory.sources[selectedSource.id] || 0;
    return assignedCreeps < getFreeSpaces(selectedSource);

}
global.canSpawnHarvester = function (room) {
    var canSpawn = false;
    const roomSources = room.find(FIND_SOURCES)
    for (const i in roomSources) {
        if (sourceHasFreeSpaces(roomSources[i])) {
            canSpawn = true;
        }
    }
    return canSpawn;
}


function canSpawnCreep(spawn, creep) {
    if (creep && spawn.my) {
        const spawnSpawnValue = spawn.spawnCreep(creep.components.bodyParts, creep.name, {dryRun: true});
        if (spawnSpawnValue === 0) {
            return true;
        }
    }
    return false;
}


function runCreep() {
    for (const creepName in Game.creeps) {
        const creepMemory = Memory.creeps[creepName]
        const creep = Game.creeps[creepName]
        switch (creepMemory.role) {
            case Creeps.CREEP_ROLES.HARVESTER:
                Harvesters.run(creep)
                break;
            case Creeps.CREEP_ROLES.UPGRADER:
                Upgraders.run(creep)
                break;
            case Creeps.CREEP_ROLES.BUILDER:
                Builders.run(creep)
                break;
            case Creeps.CREEP_ROLES.TRANSPORTER:
                Transporters.run(creep)
                break;
            case Creeps.CREEP_ROLES.CLAIMER:
                Claimers.run(creep)
                break;
        }

    }
}

module.exports = {runCreep, spawnCreep};
