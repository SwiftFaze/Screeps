const Creeps = require("./creep")
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

        } else {
            repairStructures();
        }

    } else {
        if (Creeps.withdrawFromStructure(creep, container)) {
            return;
        }
        if (Creeps.harvestStructure(creep, storage)) {
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
    source = Creeps.getAssignedSource(creep);
    extension = Creeps.getClosestEnergyStructure(creep, STRUCTURE_EXTENSION);
    extensionSite = Creeps.getClosestSite(creep, STRUCTURE_EXTENSION);
    tower = Creeps.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    towerSite = Creeps.getClosestSite(creep, STRUCTURE_TOWER);
    road = Creeps.getMyClosestBasicStructure(creep, STRUCTURE_ROAD);
    roadSite = Creeps.getClosestSite(creep, STRUCTURE_ROAD);
    storage = Creeps.getClosestEnergyStructure(creep, STRUCTURE_STORAGE);
    storageSite = Creeps.getClosestSite(creep, STRUCTURE_STORAGE);
    rampart = Creeps.getMyClosestBasicStructure(creep, STRUCTURE_RAMPART);
    rampartSite = Creeps.getClosestSite(creep, STRUCTURE_RAMPART);
    container = Creeps.getClosestContainer(creep);
    containerSite = Creeps.getClosestSite(creep, STRUCTURE_CONTAINER);
    wall = Creeps.getMyClosestBasicStructure(creep, STRUCTURE_WALL);
    wallSite = Creeps.getClosestSite(creep, STRUCTURE_WALL);
    resourceEnergy = Creeps.getClosestDroppedResource(creep, RESOURCE_ENERGY);

}

function buildStructures() {
    if (Creeps.buildStructure(creep, containerSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, extensionSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, storageSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, towerSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, roadSite)) {
        return true;
    }
    return Creeps.buildStructure(creep, rampartSite);

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
