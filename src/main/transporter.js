const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let resourceEnergy;
let source;
let spawn;
let extension;
let storage;
let container;
let tower;
let extensionDistance;
let spawnDistance;
let towerDistance;
let storageDistance;
let controllerDistance;


function run(selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {
        if (resourceEnergy) {
            Creeps.pickUpResource(creep, resourceEnergy);
        } else {
            Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY);
        }

    } else {
        if (Creeps.transfer2Structure(creep, extension)) {
            return;
        }
        if (Creeps.transfer2Structure(creep, spawn)) {
            return;
        }
        if (Creeps.transfer2Structure(creep, tower)) {
            return;
        }
        if (Creeps.transfer2Structure(creep, storage)) {
            return;
        }
        Creeps.upgradeRoomController(creep)
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
    extension = Structures.getClosestEnergyStructure(creep, STRUCTURE_EXTENSION);
    tower = Structures.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    storage = Structures.getClosestEnergyStructure(creep, STRUCTURE_STORAGE);
    container = Structures.getClosestContainer(creep);

    extensionDistance = creep.pos.getRangeTo(extension)
    spawnDistance = creep.pos.getRangeTo(spawn)
    towerDistance = creep.pos.getRangeTo(tower)
    storageDistance = creep.pos.getRangeTo(storage)
    controllerDistance = creep.pos.getRangeTo(creep.room.controller)


}

function isClosestStucture(wantedStructure, s1, s2, s3) {
    if (wantedStructure) {
        if (!s1) {
            s1 = 10000
        }
        if (!s2) {
            s2 = 10000
        }
        if (!s3) {
            s3 = 10000
        }
        return wantedStructure <= s1 && wantedStructure <= s2 && wantedStructure <= s3;
    } else {
        return false;
    }
}

module.exports = {run};
