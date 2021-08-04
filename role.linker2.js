
var roleLinker2 = {


    /* @param {Creep} creep */
    run: function (creep) {

        var LinkTransfer = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK)
                }
            });

        var ContainerTransfer = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            });

        if (creep.memory.homeRoom == undefined) {
            creep.memory.homeRoom = creep.room.name;
        }




        if (creep.memory.linking2 == undefined) {
            creep.memory.linking2 = false;
        }

        if (creep.memory.linking2 && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.linking2 = false;
        }

        if (!creep.memory.linking2 && creep.store.getFreeCapacity() == 0) {
            creep.memory.linking2 = true;
        }

        var sources = creep.room.find(FIND_SOURCES);


        if (creep.memory.linking2 == false) {

            var sources = creep.room.find(FIND_SOURCES);
            if (sources[1].energy !== 0) {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE && sources[1].energy != 0) {
                    creep.moveTo(sources[1]);
                }
            }
            else {
                if (sources[1].energy == 0) {
                    if (creep.withdraw(ContainerTransfer[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.withdraw(ContainerTransfer[1]);
                    }
                }
            }

        }
        else {

            if (LinkTransfer[2].energy !== 800) {
                if (creep.transfer(LinkTransfer[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(LinkTransfer[2]);
                }
            }
            else {
                if (LinkTransfer[1].energy == 800) {
                    if (creep.transfer(ContainerTransfer[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ContainerTransfer[1]);
                    }
                }
            }
        }
    }
};
module.exports = roleLinker2;
