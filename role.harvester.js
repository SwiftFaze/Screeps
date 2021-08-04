
var roleHarvester = {


    /* @param {Creep} creep */
    run: function (creep) {

        var SpawnTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY)) > 0
            }
        });
        
        var ExtensionTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY)) > 0
            }
        });
        ExtensionTransfer = creep.pos.findClosestByRange(ExtensionTransfer);
        
        
        var StorageTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_STORAGE && 
                    structure.store.getUsedCapacity(RESOURCE_ENERGY)) > 0
            }
        }); 




        if (creep.memory.homeRoom == undefined) {
            creep.memory.homeRoom = creep.room.name;
        }


        if (creep.memory.harvesting == undefined) {
            creep.memory.harvesting = false;
        }


        if (creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = true;
        }



        if (creep.memory.harvesting == false) {

            var sources = creep.room.find(FIND_SOURCES);

            if (creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(StorageTransfer[0]);
                creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY);
            }
            else {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }

        }
        else {

            if (ExtensionTransfer !== null) {
                    if (creep.transfer(ExtensionTransfer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ExtensionTransfer);
                    }
            }
            else {
                 if (SpawnTransfer.length !== 0) {
                    if (creep.transfer(SpawnTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(SpawnTransfer[0]);
                    }
                 }
            }
        }
    }


};
module.exports = roleHarvester;
