const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let storage;
let container;
let resourceEnergy;
let terminal;

function run(selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {
        if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
            if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                return;
            }
        }
        if (Creeps.withdrawFromStructure(creep, terminal, RESOURCE_ENERGY)) {
            return;
        }
        if (Creeps.pickUpResource(creep, resourceEnergy)) {
            return;
        }
        Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)
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
    container = Structures.getClosestFullContainer(creep);
    resourceEnergy = Structures.getClosestDroppedResource(creep, RESOURCE_ENERGY);
    terminal = Structures.getClosestEnergyStructure(creep, STRUCTURE_TERMINAL);


}


module.exports = {run};
