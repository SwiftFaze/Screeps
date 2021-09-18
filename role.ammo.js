var roleammo = {


    /* @param {Creep} creep */
    run: function (creep) {




        if (creep.memory.ammoing == undefined) {
            creep.memory.ammoing = false;
        }
        if (creep.memory.ammoing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.ammoing = false;
        }
        if (!creep.memory.ammoing && creep.store.getFreeCapacity() == 0) {
            creep.memory.ammoing = true;
        }
        if (creep.memory.homeRoom == undefined) {
            creep.memory.homeRoom = creep.room.name;
        }

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        var link = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });
        
        var terminal = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TERMINAL);
            }
        });


        var towers = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400)
                }
            });

        var Storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE);
            }
        });



        if (link.length == 0) {
            if (creep.memory.ammoing == false) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.memory.homeRoom == 'W13N18') {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                else {
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
            }
            if (creep.memory.ammoing == true) {
                if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
            }
            else {
                if (creep.transfer(Storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Storage[0]);
               }    
            }
        }
        else {
            //If there arent enemys - Collects energy from Link or terminal
            if (creep.memory.ammoing == false && closestHostile == null) {

                if (link[0].store[RESOURCE_ENERGY] != 0){
                    if (creep.withdraw(link[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link[0]);
                        creep.withdraw(link[0], RESOURCE_ENERGY);
                    }
                }
                if(terminal[0].store[RESOURCE_ENERGY] != 0)
                {
                    creep.moveTo(terminal[0]);
                    creep.withdraw(terminal[0], RESOURCE_ENERGY);  
                }
                if(Storage[0].store[RESOURCE_ENERGY] > 400000 /*add tower length*/)
                {
                    creep.moveTo(Storage[0]);
                    creep.withdraw(Storage[0], RESOURCE_ENERGY);
                }
                
                
            }
            //If there are enemys - Collects energy from Storage
            if (creep.memory.ammoing == false && closestHostile != null) {
                if (creep.withdraw(Storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Storage[0]);
                    creep.withdraw(Storage[0], RESOURCE_ENERGY);
                }
            }
            if (creep.memory.ammoing == true && towers != "") {
                if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
            }
            
            if (creep.memory.ammoing == true && towers == "") {
                /*
                if(Storage[0].store[RESOURCE_ENERGY] >= 500000)
                {
                    if (creep.transfer(terminal[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal[0]);
                    }
                }
                else{
                */
                    if (creep.transfer(Storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Storage[0]);
                    }
                

            }
            
        }
    }

};
module.exports = roleammo;
