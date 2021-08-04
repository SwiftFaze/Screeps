
var roleLinker = {


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




        if (creep.memory.linking == undefined) {
            creep.memory.linking = false;
        }

        if (creep.memory.linking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.linking = false;
        }

        if (!creep.memory.linking && creep.store.getFreeCapacity() == 0) {
            creep.memory.linking = true;
        }

        var sources = creep.room.find(FIND_SOURCES);


        if (creep.memory.linking == false) {

            var sources = creep.room.find(FIND_SOURCES);
            if (sources[0].energy !== 0) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && sources[0].energy != 0) {
                    creep.moveTo(sources[0]);
                }
            }

            else {
                if (sources[0].energy == 0) {
                    if (creep.withdraw(ContainerTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.withdraw(ContainerTransfer[0]);
                    }
                }
            }



        }
        else {

            if (LinkTransfer[1].energy !== 800) {
                if (creep.transfer(LinkTransfer[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(LinkTransfer[1]);
                }
            }

            else {
                if (LinkTransfer[0].energy == 800) {
                    if (creep.transfer(ContainerTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ContainerTransfer[0]);
                    }
                }
            }

        }
    }
};
module.exports = roleLinker;
