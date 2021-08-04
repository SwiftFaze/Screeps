

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        if(creep.memory.homeRoom == undefined)
        {
            creep.memory.homeRoom = creep.room.name;
        }          
        

        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) 
        {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');      
	    }

	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) 
        {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) 
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller);
            }
        }
        else 
        {  
            
        var Storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_STORAGE && 
                    structure.store.getUsedCapacity(RESOURCE_ENERGY)) > 0
            }
        });   
                   
            
            if(creep.withdraw(Storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(Storage[0]);
                creep.withdraw(Storage[0], RESOURCE_ENERGY);            
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0]);    
                }                    
                
            }
            
    
        }
	}
};

module.exports = roleUpgrader;