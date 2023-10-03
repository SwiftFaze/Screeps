const Settings = require("./settings")


function canWithdrawFromStorage(structure, resourceType) {
    let able2Withdraw = false
    if (structure) {
        if (resourceType === RESOURCE_ENERGY) {
            return structure.store.getUsedCapacity(RESOURCE_ENERGY) > Settings.MIN_STORAGE_ENERGY;
        } else {
            return true;
        }
    }


    return able2Withdraw;
}


function getAssignedSource(creep) {
    return Game.getObjectById(creep.memory.sourceId);

}

function getClosestDroppedResource(creep) {
    const droppedResourceEnergies = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
            return resource.resourceType === RESOURCE_ENERGY && resource.amount >= 150;
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

function getClosestPowerSpawn(creep) {

    const spawns = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_POWER_SPAWN && structure.store.getFreeCapacity())
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

function getClosestFullContainer(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity() >= 150)
        }
    });
    return creep.pos.findClosestByRange(structures);
}

function getClosestContainer(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity() !== 0)
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

function getClosestRepairableEnergyStructure(creep, type) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type && structure.hits < structure.hitsMax)
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

function getMyClosestRepairableBasicStructure(creep, type) {
    const structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type && structure.hits < structure.hitsMax)
        }
    });
    return creep.pos.findClosestByRange(structures);
}


function getMyClosestRepairableContainer(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
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

function getClosestRepairableBasicStructure(creep, type) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === type && structure.hits < structure.hitsMax)
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

    if (sites.length === 0 && type === STRUCTURE_SPAWN) {
        var buildFlag = getFlag('BUILD')
        if (buildFlag !== undefined) {
            const sites = Game.rooms[buildFlag.pos.roomName].find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType === type)
                }
            });
            if (sites.length !== 0) {
                return sites[0]
            }
        }
    } else {
        return creep.pos.findClosestByRange(sites);
    }

}

function getClosestTower(creep) {
    const towers = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) !== 0)
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
            return (structure.structureType === STRUCTURE_STORAGE)
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

function isNot2Far(creep, structure) {
    if (structure) {
        return creep.pos.getRangeTo(structure) < 10;
    } else {
        return false;
    }

}

function getClosestLinkToStorage(room) {
    const storage = room.storage;
    if (!storage) return null; // No storage in the room

    const links = room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_LINK}
    });

    const linksSortedByDistanceToStorage = _.sortBy(links, link => storage.pos.getRangeTo(link));
    return linksSortedByDistanceToStorage[0];
}


function sourceIsDepleted(source) {
    return source.energy === 0;

}

function getRoomLinkCount(room) {
    var links = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_LINK)
        }
    });
    if (links) {
        return links.length;
    } else {
        return 0;
    }
}


function getFlag(wantedFlagName) {
    for (var flagName in Game.flags) {
        if (flagName.toUpperCase() === wantedFlagName) {
            return Game.flags[flagName]
        }
    }
}

module.exports = {
    getClosestBasicStructure,
    sourceIsDepleted,
    getFlag,
    getRoomLinkCount,
    getClosestContainer,
    isNot2Far,
    getClosestLinkToStorage,
    getClosestTerminal,
    getClosestStorage,
    getClosestRoad,
    getClosestTower,
    getClosestSite,
    getMyClosestBasicStructure,
    getMyClosestRepairableContainer,
    getClosestRepairableEnergyStructure,
    getClosestRepairableBasicStructure,
    getClosestEnergyStructure,
    getMyClosestRepairableBasicStructure,
    getClosestExtension,
    getClosestSpawn,
    getClosestDroppedResource,
    getAssignedSource,
    getClosestFullContainer: getClosestFullContainer,
    canWithdrawFromStorage
};
