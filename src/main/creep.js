const CreepComponents = require("./creepComponents")
const Structures = require("./structures")

const CREEP_ROLES = {
    HARVESTER: 'harvester',
    TRANSPORTER: 'transporter',
    UPGRADER: 'upgrader',
    BUILDER: 'builder',
    ATTACKER: 'attacker',
    RANGED_ATTACKER: 'ranged_attacker',
    HEALER: 'healer',
    TANK: 'tank',
    CLAIMER: 'claimer'
}

class MyCreep {
    constructor(name, components) {
        this.name = name;
        this.components = components;
    }
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
                        const currentCreepAmount = creepList.filter(creep => creep.memory.role === role).length

                        if (currentCreepAmount === 0 && role === CREEP_ROLES.TRANSPORTER) {
                            creepComponents = CreepComponents.getCreepComponents(1, role);
                            creepName = getCreepName(creepComponents.role);
                            return new MyCreep(creepName, creepComponents);
                        } else if (CreepComponents.creepBuilds[roomLevel][buildableCreepRole].quantity > currentCreepAmount) {
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

function withdrawFromStructure(creep, structure, resourceType) {
    var able2Withdraw = false;
    if (structure) {
        able2Withdraw = true
        if (creep.withdraw(structure, resourceType) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }

    return able2Withdraw
}

function withdrawFromStorage(creep, structure, resourceType) {
    var able2Withdraw = false;
    if (structure && Structures.canWithdrawFromStorage(structure, resourceType)) {
        able2Withdraw = true;
        if (creep.withdraw(structure, resourceType) === ERR_NOT_IN_RANGE) {
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
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
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

function withdrawAll(creep, structure) {
    const structureStore = structure.store;

    for (const resourceType in structureStore) {
        withdrawFromStructure(creep, structure, structureStore[resourceType])
    }
}


module.exports = {
    resetTransporterLinks,
    hasLink,
    withdrawAll,
    canBuild,
    canHarvest,
    repairStructure,
    setMemoryBuildingState,
    setMemoryHarvestingState,
    setMemoryHome,
    buildStructure,
    transfer2Structure,
    upgradeRoomController,
    withdrawFromStructure,
    harvestStructure,
    pickUpResource,
    withdrawFromStorage,
    createCreep,
    CREEP_ROLES
};
