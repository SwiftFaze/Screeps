const Creeps = require("./creep")
const Structures = require("./structures")
let creep;
let storage;
let storage2Repair;
let storageSite;
let road;
let road2Repair;
let roadSite;
let extension;
let extension2Repair;
let extensionSite
let tower;
let tower2Repair;
let towerSite;
let source;
let rampart;
let rampart2Repair;
let rampartSite;
let container;
let container2Repair;
let containerSite;
let wall;
let wall2Repair;
let wallSite;
let link;
let link2Repair;
let linkSite;
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
    extension2Repair = Structures.getClosestRepairableEnergyStructure(creep, STRUCTURE_EXTENSION);
    extensionSite = Structures.getClosestSite(creep, STRUCTURE_EXTENSION);

    tower = Structures.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    tower2Repair = Structures.getClosestRepairableEnergyStructure(creep, STRUCTURE_TOWER);
    towerSite = Structures.getClosestSite(creep, STRUCTURE_TOWER);

    road = Structures.getMyClosestBasicStructure(creep, STRUCTURE_ROAD);
    road2Repair = Structures.getClosestRepairableBasicStructure(creep, STRUCTURE_ROAD);
    roadSite = Structures.getClosestSite(creep, STRUCTURE_ROAD);

    storage = Structures.getClosestStorage(creep)
    storageSite = Structures.getClosestSite(creep, STRUCTURE_STORAGE);

    rampart = Structures.getMyClosestBasicStructure(creep, STRUCTURE_RAMPART);
    rampart2Repair = Structures.getClosestRepairableBasicStructure(creep, STRUCTURE_RAMPART);
    rampartSite = Structures.getClosestSite(creep, STRUCTURE_RAMPART);

    container = Structures.getClosestFullContainer(creep);
    container2Repair = Structures.getMyClosestRepairableContainer(creep);
    containerSite = Structures.getClosestSite(creep, STRUCTURE_CONTAINER);

    link = Structures.getClosestFullContainer(creep);
    link2Repair = Structures.getClosestRepairableEnergyStructure(creep);
    linkSite = Structures.getClosestSite(creep, STRUCTURE_LINK);


    wall = Structures.getMyClosestBasicStructure(creep, STRUCTURE_WALL);
    wall2Repair = Structures.getClosestRepairableBasicStructure(creep, STRUCTURE_WALL);
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
    if (Creeps.buildStructure(creep, storageSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, linkSite)) {
        return true;
    }
    if (Creeps.buildStructure(creep, roadSite)) {
        return true;
    }
    return Creeps.buildStructure(creep, rampartSite);


}

function repairStructures() {
    if (Creeps.repairStructure(creep, container2Repair)) {
        return true;
    }
    if (Creeps.repairStructure(creep, extension2Repair)) {
        return true;
    }
    if (Creeps.repairStructure(creep, tower2Repair)) {
        return true;
    }
    if (Creeps.repairStructure(creep, storage2Repair)) {
        return true;
    }
    if (Creeps.repairStructure(creep, link2Repair)) {
        return true;
    }
    if (Creeps.repairStructure(creep, road2Repair)) {
        return true;
    }
    return Creeps.repairStructure(creep, rampart2Repair);

}

module.exports = {run};
