const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let resourceEnergy;
let source;
let spawn;
let extension;
let link;
let storage;
let container;
let tower;
let extensionDistance;
let spawnDistance;
let towerDistance;
let storageDistance;
let controllerDistance;
let storageLink;
let terminal;


function run(selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {
        creep.memory.hasWithdrawnFromStorage = false;

        if (Structures.getRoomLinkCount(creep.room) > 2) {
            if (storageLink.store.getUsedCapacity(RESOURCE_ENERGY) !== 0) {
                if (Creeps.withdrawFromStructure(creep, storageLink, RESOURCE_ENERGY)) {
                    return;
                }
            }
            if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
                if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                    creep.memory.hasWithdrawnFromStorage = true;
                    return;
                }
            }
            Creeps.pickUpResource(creep, resourceEnergy);
        }


        if (Structures.getRoomLinkCount(creep.room) === 2) {
            if (storageLink.store.getUsedCapacity(RESOURCE_ENERGY) !== 0) {
                if (Creeps.withdrawFromStructure(creep, storageLink, RESOURCE_ENERGY)) {
                    return;
                }
            }
            if (Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)) {
                return;
            }
            if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
                if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                    creep.memory.hasWithdrawnFromStorage = true;
                    return;
                }
            }
            Creeps.pickUpResource(creep, resourceEnergy);


        }


        if (Structures.getRoomLinkCount(creep.room) < 2) {
            if (Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)) {
                return;
            }
            if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
                if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                    creep.memory.hasWithdrawnFromStorage = true;
                    return;
                }
            }
            Creeps.pickUpResource(creep, resourceEnergy);
        }


    } else {
        if (Creeps.transfer2Structure(creep, extension)) {
            creep.memory.hasWithdrawnFromStorage = false;
            return;
        }
        if (Creeps.transfer2Structure(creep, spawn)) {
            creep.memory.hasWithdrawnFromStorage = false;
            return;
        }
        if (Creeps.transfer2Structure(creep, tower)) {
            creep.memory.hasWithdrawnFromStorage = false;
            return;
        }

        if (Creeps.transfer2Structure(creep, storage)) {
            return;
        }

        if (!creep.memory.hasWithdrawnFromStorage) {
            if (Creeps.transfer2Structure(creep, terminal)) {
                creep.memory.hasWithdrawnFromStorage = false;
                return;
            }
        }


        Creeps.upgradeRoomController(creep)
        creep.memory.hasWithdrawnFromStorage = false;
    }

}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryHarvestingState(creep)
}

function setClosestStructures() {
    source = Structures.getAssignedSource(creep);
    resourceEnergy = Structures.getClosestDroppedResource(creep, RESOURCE_ENERGY);
    spawn = Structures.getClosestEnergyStructure(creep, STRUCTURE_SPAWN);
    link = Structures.getClosestEnergyStructure(creep, STRUCTURE_LINK);
    extension = Structures.getClosestEnergyStructure(creep, STRUCTURE_EXTENSION);
    tower = Structures.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    storage = Structures.getClosestEnergyStructure(creep, STRUCTURE_STORAGE);
    container = Structures.getClosestFullContainer(creep);
    storageLink = Structures.getClosestLinkToStorage(creep.room);
    terminal = Structures.getClosestEnergyStructure(creep, STRUCTURE_TERMINAL);

}


module.exports = {run};
