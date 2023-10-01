const controller = require("./controller")
const Creeps = require("./creep");
const Structures = require("./structures");
let creep;
let spawn;
let extension;
let storage;
let tower;
let container;
let resourceEnergy;
let source;
let link;


function run(selectedCreep) {
    creep = selectedCreep;

    setMemory();

    if (!controller.setControllerSign(creep)) {
        if (Creeps.canHarvest(creep)) {
            if (Structures.sourceIsDepleted(source)) {
                if (Structures.isNot2Far(creep, resourceEnergy) && Creeps.pickUpResource(creep, resourceEnergy)) {
                    return;
                }
                if (Structures.isNot2Far(creep, container) && Creeps.withdrawFromStructure(creep, container, RESOURCE_ENERGY)) {
                }
            } else {
                Creeps.harvestStructure(creep, source)
            }
        } else {
            if (Creeps.hasLink(creep)) {
                if (Structures.sourceIsDepleted(source)) {
                    runDefaultTransfermode()
                } else {
                    if (Structures.isNot2Far(creep, link) && Creeps.transfer2Structure(creep, link)) {
                        return;
                    }
                    if (Structures.isNot2Far(creep, container) && Creeps.transfer2Structure(creep, container)) {
                        return;
                    }
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
}





module.exports = {run};
