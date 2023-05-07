const controller = require("./controller")
const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let spawn;
let extension;
let storage;
let tower;
let container;
let source;


function run(selectedCreep) {
    creep = selectedCreep;

    setMemory();
    setClosestStructures()
    if (!controller.setControllerSign(creep)) {

        if (Creeps.canHarvest(creep)) {
            Creeps.harvestStructure(creep, source);

        } else {
            if (Creeps.hasLink(creep)) {
                if (container) {
                    if (creep.pos.getRangeTo(container) < 10) {
                        if (container.store.getFreeCapacity() !== 0) {
                            Creeps.transfer2Structure(creep, container);
                        } else {
                            creep.drop(RESOURCE_ENERGY);
                        }
                    } else {
                        creep.drop(RESOURCE_ENERGY);
                    }
                } else {
                    creep.drop(RESOURCE_ENERGY);
                }

            } else {
                runDefaultTransfermode()
            }

        }
    }
}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryHarvestingState(creep)
}

function setClosestStructures() {
    source = Structures.getAssignedSource(creep);
    spawn = Structures.getClosestEnergyStructure(creep, STRUCTURE_SPAWN);
    extension = Structures.getClosestEnergyStructure(creep, STRUCTURE_EXTENSION);
    tower = Structures.getClosestEnergyStructure(creep, STRUCTURE_TOWER);
    storage = Structures.getClosestEnergyStructure(creep, STRUCTURE_STORAGE);
    container = Structures.getClosestBasicStructure(creep, STRUCTURE_CONTAINER);
}

function runDefaultTransfermode() {
    if (Creeps.transfer2Structure(creep, extension)) {
        return;
    }
    if (Creeps.transfer2Structure(creep, spawn)) {
        return;
    }
    Creeps.transfer2Structure(creep, tower)

}


module.exports = {run};
