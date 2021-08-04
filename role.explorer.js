
var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        if(creep.memory.homeRoom == undefined)
        {
            creep.memory.homeRoom = creep.room.name;
        }          
          
            
        if(creep.memory.harvesting == undefined)
        {
            creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) 
        {
            creep.memory.harvesting = false;   
        }  
        if(!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) 
        {
            creep.memory.harvesting = true;       
        }  

        
        if (creep.room == "[room W11N18]")
        {
            if(creep.memory.harvesting == false)
            {
                const exitDir = creep.room.findExitTo("W12N18",FIND_EXIT_LEFT);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            }
            
        }
        
        if (creep.room != "[room W11N18]")
        {

            if(creep.memory.harvesting == false)
            { 
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0]);       
                }
            }
            if(creep.memory.harvesting == true)
            {
                
                
            var towers = Game.rooms.W12N18.find(FIND_STRUCTURES, 
                {
                    filter: (structure) => 
                    {
                        return (structure.structureType == STRUCTURE_TOWER && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 500  )
                    }
                });
    
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) 
                {
                    creep.moveTo(towers[0]);     
                }                
                else
                {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }




/*            
            if(creep.memory.harvesting == true)
            { 
                const exitDir = creep.room.findExitTo("W11N18",FIND_EXIT_RIGHT);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            }    
*/                    
        } 
            
            

    }
};   
module.exports = roleExplorer;




//Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE, MOVE], "Explorer", {role: 'explorer'});
