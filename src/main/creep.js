const CreepComponents = require("./creepComponents")

const CREEP_ROLES = {
    HARVESTER: 'harvester',
    TRANSPORTER: 'transporter',
    BUILDER: 'builder',
    ATTACKER: 'attacker',
    RANGED_ATTACKER: 'ranged_attacker',
    HEALER: 'healer',
    TANK: 'tank',
    CLAIMER: 'claimer',
    UPGRADER: 'upgrader'
}

class MyCreep {
    constructor(name, components) {
        this.name = name;
        this.components = components;
    }
}

function getCreepsList() {
    const creepList = []
    for (const creep in Game.creeps) {
        creepList.push(creep)
    }
    return creepList;
}

function createCreep(spawn) {
    const room = spawn.room
    const roomLevel = room.controller.level
    const creepList = []
    for (const creep in Game.creeps) {
        if (Game.creeps[creep].room.name === room.name) {
            creepList.push(Game.creeps[creep])
        }
    }


    let creepComponents;
    let creepName;


    for (const roleName in CREEP_ROLES) {
        const role = CREEP_ROLES[roleName]

        for (const buildableCreepRole in CreepComponents.creepBuilds[roomLevel]) {

            if (buildableCreepRole === role) {


                if (creepList.length === 0) {
                    return new MyCreep(getCreepName(CREEP_ROLES.HARVESTER), CreepComponents.getCreepComponents(1, CREEP_ROLES.HARVESTER));
                } else {
                    if (role === CREEP_ROLES.HARVESTER) {

                        if (canSpawnHarvester(room)) {
                            if (CreepComponents.creepBuilds[roomLevel][buildableCreepRole].quantity > creepList.filter(creep => creep.memory.role === role).length) {
                                creepComponents = CreepComponents.getCreepComponents(roomLevel, role);
                                creepName = getCreepName(creepComponents.role);
                                return new MyCreep(creepName, creepComponents);
                            }
                        }
                    } else {
                        if (CreepComponents.creepBuilds[roomLevel][buildableCreepRole].quantity > creepList.filter(creep => creep.memory.role === role).length) {
                            creepComponents = CreepComponents.getCreepComponents(roomLevel, role);
                            creepName = getCreepName(creepComponents.role);
                            return new MyCreep(creepName, creepComponents);
                        }
                    }


                }
            }
        }

    }


}


function generateCreep(roomLevel, buildableCreepRole, role, creepList) {
    if (CreepComponents.creepBuilds[roomLevel][buildableCreepRole].quantity > creepList.filter(creep => creep.memory.role === role).length) {
        const creepComponents = CreepComponents.getCreepComponents(roomLevel, role);
        return new MyCreep(getCreepName(creepComponents.role), creepComponents);
    }
    return null;
}


function getBodyParts(spawn) {
}

function getCreepName(role) {
    return role.charAt(0).toUpperCase() + "_" + generateRandomString(5);
}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234567890123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getAssignedSource(creep) {
    return Game.getObjectById(creep.memory.sourceId);

}

function getClosestDroppedResource(creep) {
    const droppedResourceEnergies = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
            return resource.resourceType === RESOURCE_ENERGY && resource.amount > 150;
        }
    });
    return creep.pos.findClosestByRange(droppedResourceEnergies);
}

function getClosestSpawn(creep) {

    const spawns = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_SPAWN && structure.store.getFreeCapacity())
        }
    });
    return creep.pos.findClosestByRange(spawns);
}

function getClosestExtension(creep) {
    const extensions = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity())
        }
    });
    return creep.pos.findClosestByRange(extensions);
}

function getClosestContainer(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity() > 150)
        }
    });
    return creep.pos.findClosestByRange(structures);
}


function getClosestEnergyStructure(creep, type) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        }
    });
    return creep.pos.findClosestByRange(structures);
}

function getMyClosestBasicStructure(creep, type) {
    const structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type)
        }
    });
    return creep.pos.findClosestByRange(structures);
}

function getClosestBasicStructure(creep, type) {

    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type)
        }
    });
    return creep.pos.findClosestByRange(structures);
}


function getClosestSite(creep, type) {
    const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
        filter: (site) => {
            return (site.structureType === type)
        }
    });
    return creep.pos.findClosestByRange(sites);
}

function getClosestTower(creep) {
    const towers = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY))
        }
    });
    return creep.pos.findClosestByRange(towers);
}

function getClosestRoad(creep) {
    const roads = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_ROAD)
        }
    });
    return creep.pos.findClosestByRange(roads);
}

function getClosestStorage(creep) {
    const storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_STORAGE && structure.store.getUsedCapacity(RESOURCE_ENERGY))
        }
    });
    return creep.pos.findClosestByRange(storages);
}

function getClosestTerminal(creep) {
    const terminal = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_TERMINAL);
        }
    });
    return creep.pos.findClosestByRange(terminal);
}

function pickUpResource(creep, resource) {
    var able2Pickup = false;
    if (resource) {
        able2Pickup = true;
        if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(resource);
        }
    }
    return able2Pickup;
}

function harvestStructure(creep, structure) {
    var able2Harvest = false;
    if (structure) {
        able2Harvest = true;
        if (creep.harvest(structure) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }

    return able2Harvest
}

function withdrawFromStructure(creep, structure) {
    var able2Withdraw = false;
    if (structure) {
        able2Withdraw = true
        if (creep.withdraw(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }

    return able2Withdraw
}

function upgradeRoomController(creep) {
    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}

function transfer2Structure(creep, structure) {
    var able2Transfer = false;
    if (structure) {
        able2Transfer = true;
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
    return able2Transfer
}

function buildStructure(creep, structure) {
    var able2Build = false;
    if (structure) {
        able2Build = true;
        if (creep.build(structure) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
    return able2Build;
}

function setMemoryHome(creep) {
    if (creep.memory.home === undefined) {
        creep.memory.home = creep.room.name;
    }
}

function setMemoryHarvestingState(creep) {
    if (creep.memory.harvesting === undefined) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.harvesting = true;
    }
    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
        creep.memory.harvesting = false;
    }
}

function setMemoryBuildingState(creep) {
    if (creep.memory.building === undefined) {
        creep.memory.building = false;
    }
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false;
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true;
    }
}

function repairStructure(creep, structure) {
    var able2Build = false;
    if (structure) {
        able2Build = true;
        if (creep.build(structure) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
    return able2Build;
}

function canHarvest(creep) {
    return creep.memory.harvesting
}

function canBuild(creep) {
    return creep.memory.building
}

function hasLink(creep) {
    return creep.memory.linked
}

function creepIsLinked(spawn, creep) {
    var isLinked = false

    if (creep.components.role === CREEP_ROLES.HARVESTER) {
        const creepsInRoom = spawn.room.find(FIND_MY_CREEPS).filter(creepInRoom => creepInRoom.memory.role === CREEP_ROLES.TRANSPORTER);
        if (creepsInRoom.length) {
            isLinked = true;
        }
    }

    if (creep.components.role === CREEP_ROLES.TRANSPORTER) {
        isLinked = resetHarvesterLinks(spawn)
    }


    return isLinked;
}

function resetHarvesterLinks(spawn) {
    const harvestersInRoom = spawn.room.find(FIND_MY_CREEPS).filter(creepInRoom => creepInRoom.memory.role === CREEP_ROLES.HARVESTER);

    if (harvestersInRoom.length) {
        for (const i in harvestersInRoom) {
            harvestersInRoom[i].memory.linked = true;
        }
        return true;
    }
    return false
}

function resetTransporterLinks(spawn) {
    const transportersInRoom = spawn.room.find(FIND_MY_CREEPS).filter(creepInRoom => creepInRoom.memory.role === CREEP_ROLES.TRANSPORTER);
    const harvestersInRoom = spawn.room.find(FIND_MY_CREEPS).filter(creepInRoom => creepInRoom.memory.role === CREEP_ROLES.HARVESTER);
    if (transportersInRoom.length === 0 || harvestersInRoom.length === 0) {
        for (const i in Memory.creeps) {
            Memory.creeps[i].linked = false;
        }
    } else {
        for (const i in Memory.creeps) {
            Memory.creeps[i].linked = true;
        }
    }

    return false;

}


module.exports = {
    resetTransporterLinks,
    resetHarvesterLinks,
    creepIsLinked,
    hasLink,
    canBuild,
    getCreepName,
    canHarvest,
    repairStructure,
    setMemoryBuildingState,
    setMemoryHarvestingState,
    setMemoryHome,
    getClosestBasicStructure,
    buildStructure,
    transfer2Structure,
    upgradeRoomController,
    withdrawFromStructure,
    harvestStructure,
    pickUpResource,
    getClosestTerminal,
    getClosestStorage,
    getClosestRoad,
    getClosestTower,
    getClosestSite,
    getMyClosestBasicStructure,
    getClosestEnergyStructure,
    getClosestExtension,
    getClosestSpawn,
    getClosestDroppedResource,
    getAssignedSource,
    getBodyParts,
    createCreep,
    CREEP_ROLES,
    getCreepsList,
    getClosestContainer
};
