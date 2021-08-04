var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        
        if(creep.memory.building == undefined)
        {
            creep.memory.building = false;
        }
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) 
        {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) 
        {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
        if(creep.memory.homeRoom == undefined)
        {
            creep.memory.homeRoom = creep.room.name;
        }          


        var wallsToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_WALL) && structure.hits < 8000000});    
        var rampartsToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_RAMPART) && structure.hits <  4000000});



        var StorageTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_STORAGE)
            }
        });  


        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if(targets.length) 
        {
            if(creep.memory.building == false)
            {
               
                var sources = creep.room.find(FIND_SOURCES);

                if ( StorageTransfer[0].store[RESOURCE_ENERGY] >= 100000)
                {
                    if (creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(StorageTransfer[0], {visualizePathStyle: {stroke: '#8B0000',strokeWidth: .15, opacity: 0.5}});
                        creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY);
                    }
                }
                else  
                {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE ) 
                    {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#8B0000',strokeWidth: .15, opacity: 0.5}});
                    }
                }
                
            }
            if(creep.memory.building == true)
            {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#8B0000',strokeWidth: .15, opacity: 0.5}});
                }
            }
        }   
        else
        {       
            if(creep.memory.building == false)
            {
               
                var sources = creep.room.find(FIND_SOURCES);

                if ( StorageTransfer[0].store[RESOURCE_ENERGY] >= 100000)
                {
                    if (creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(StorageTransfer[0], {visualizePathStyle: {stroke: '#8B0000',strokeWidth: .15, opacity: 0.5}});
                        creep.withdraw(StorageTransfer[0], RESOURCE_ENERGY);
                    }
                }
                else  
                {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE ) 
                    {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#8B0000',strokeWidth: .15, opacity: 0.5}});
                    }
                }
                
            }  
            if(creep.memory.building == true)
            {
                if (wallsToRepair.length !== 0)
                {
                    if(creep.repair(wallsToRepair[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(wallsToRepair[0]);
                    }
                }                       
                if (rampartsToRepair.length !== 0 && wallsToRepair.length == 0)
                {
                    if(creep.repair(rampartsToRepair[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(rampartsToRepair[0]);
                    }
                }
            }
        }         
    }
};   
module.exports = roleBuilder;