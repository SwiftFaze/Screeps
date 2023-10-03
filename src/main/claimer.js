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
    if (!Creeps.moveToRoom(creep.memory.room2Claim)) {
        creep.claimController(creep.room.controller);
    }


}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryRoom2Claim(creep)
}




module.exports = {run};
