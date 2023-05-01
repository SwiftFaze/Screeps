const Creeps = require("./creep");
let creep;
let storage;
let source;

function run (selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {
        if (storage) {
            Creeps.withdrawFromStructure(creep, storage);
        } else
            Creeps.harvestStructure(creep, source);
    } else {
        Creeps.upgradeRoomController(creep)
    }

}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryHarvestingState(creep)
}

function setClosestStructures() {
    source = Creeps.getAssignedSource(creep);
    storage = Creeps.getClosestEnergyStructure(creep, STRUCTURE_STORAGE);

}


module.exports = { run };
