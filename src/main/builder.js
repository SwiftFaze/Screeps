const Creeps = require("./creep")
const Structures = require("./structures")
let creep;
let storage;
let storageSite;
let road;
let roadSite;
let extension;
let extensionSite
let tower;
let towerSite;
let source;
let rampart;
let rampartSite;
let container;
let containerSite;
let wall;
let wallSite;
let resourceEnergy;


function run(selectedCreep) {
    creep = selectedCreep;
    setMemory()
    setClosestStructures();
    if (Creeps.canBuild(creep)) {
        if (buildStructures()) {
            return;
        }
        if (repairStructures()) {
            return;
        }
        Creeps.transfer2Structure(creep, storage)

    } else {
        if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
            if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                return;
            }
        }
        if (Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)) {
            return;
        }
        Creeps.pickUpResource(creep, resourceEnergy)
    }
}

function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryBuildingState(creep)
}

function setClosestStructures() {
    source = Structures.getAssignedSource(creep);

    extension = Structures.getClosestEnergyStructure(creep, STRUCTURE_EXTENSION);
    extensionSite = Structures.getClosestSite(creep, STRUCTURE_EXTENSION);

    tower = Structures.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    towerSite = Structures.getClosestSite(creep, STRUCTURE_TOWER);

    road = Structures.getMyClosestRepairableBasicStructure(creep, STRUCTURE_ROAD);
    roadSite = Structures.getClosestSite(creep, STRUCTURE_ROAD);

    storage = Structures.getClosestStorage(creep)
    storageSite = Structures.getClosestSite(creep, STRUCTURE_STORAGE);

    rampart = Structures.getMyClosestRepairableBasicStructure(creep, STRUCTURE_RAMPART);
    rampartSite = Structures.getClosestSite(creep, STRUCTURE_RAMPART);

    container = Structures.getClosestContainer(creep);
    containerSite = Structures.getClosestSite(creep, STRUCTURE_CONTAINER);

    wall = Structures.getMyClosestRepairableBasicStructure(creep, STRUCTURE_WALL);
    wallSite = Structures.getClosestSite(creep, STRUCTURE_WALL);

    resourceEnergy = Structures.getClosestDroppedResource(creep, RESOURCE_ENERGY);

}




function buildStructures() {
    if (Creeps.buildStructure(creep, containerSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, extensionSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, towerSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, roadSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, rampartSite)) {
        return true;
    }
    return Creeps.buildStructure(creep, storageSite);


}

function repairStructures() {
    if (Creeps.repairStructure(creep, container)) {
        return true;
    }
    if (Creeps.repairStructure(creep, extension)) {
        return true;
    }
    if (Creeps.repairStructure(creep, storage)) {
        return true;
    }
    if (Creeps.repairStructure(creep, tower)) {
        return true;
    }
    if (Creeps.repairStructure(creep, road)) {
        return true;
    }
    return Creeps.repairStructure(creep, rampart);

}

module.exports = {run};
