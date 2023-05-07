const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let storage;
let container;

function run (selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {
        if (storage) {
            Creeps.withdrawFromStorage(creep, storage, RESOURCE_ENERGY);
        } else
            Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY);
    } else {
        Creeps.upgradeRoomController(creep)
    }

}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryHarvestingState(creep)
}

function setClosestStructures() {
    storage = Structures.getClosestStorage(creep);
    container = Structures.getClosestContainer(creep);

}


module.exports = { run };
