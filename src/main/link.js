const Structures = require('./structures')

function run() {


    for (var i in Game.rooms) {
        var room = Game.rooms[i];

        const storageLink = Structures.getClosestLinkToStorage(room);


        var links = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK && structure.id !== storageLink.id)
            }
        });
        for (var x in links) {
            if (links[x].store.getFreeCapacity(RESOURCE_ENERGY) === 0 && storageLink.store.energy === 0) {
                links[x].transferEnergy(storageLink);
            }


        }
    }

}


module.exports = {run};
