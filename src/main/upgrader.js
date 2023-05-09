const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let storage;
let container;
let resourceEnergy;

function run (selectedCreep) {
    creep = selectedCreep;

    setMemory()
    setClosestStructures()


    if (Creeps.canHarvest(creep)) {

        if (Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)) {
            return;
        }
        if (Structures.canWithdrawFromStorage(storage, RESOURCE_ENERGY)) {
            if (Creeps.withdrawFromStructure(creep, storage, RESOURCE_ENERGY)) {
                return;
            }
        }
        Creeps.pickUpResource(creep, resourceEnergy);
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
    resourceEnergy = Structures.getClosestDroppedResource(creep, RESOURCE_ENERGY);

}


module.exports = { run };
