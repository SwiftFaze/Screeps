
var rolelinkerexplorer = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        var LinkTransfer = creep.room.find(FIND_STRUCTURES, 
        {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_LINK ) 
            }
        });
        
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
          
            if(creep.memory.harvesting == true)
            {
                
                    if(creep.transfer(LinkTransfer[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(LinkTransfer[2]);
                    }
                
                
            }
          
            
        }
        
        if (creep.room != "[room W11N18]")
        {

            if(creep.memory.harvesting == false)
            { 
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[1]);       
                }
            }
            if(creep.memory.harvesting == true)
            {
                const exitDir = creep.room.findExitTo("W11N18",FIND_EXIT_RIGHT);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
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
module.exports = rolelinkerexplorer;




//Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE, MOVE], "Explorer", {role: 'explorer'});
