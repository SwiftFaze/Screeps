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


}


function setMemory() {
    Creeps.setMemoryHome(creep)
    Creeps.setMemoryRoom2Claim()
    Creeps.setMemoryController2Claim()
}





module.exports = {run};
