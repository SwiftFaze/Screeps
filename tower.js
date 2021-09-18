global.Tower = function ()
{
    
    for(var name in Game.rooms) 
    {
        var allRooms = Game.rooms[name];
        
        var towers = allRooms.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                 return (structure.structureType == STRUCTURE_TOWER)
            }
        });        
          for(var name in towers) 
          {                  
            // Defining things to repair
            var rampartsToRepair = towers[name].room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType == STRUCTURE_RAMPART) && structure.hits <  4000000});
            var roadsToRepair = towers[name].room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax});
            var wallsToRepair = towers[name].room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType == STRUCTURE_WALL) && structure.hits < 10000});    
            var containersToRepair = towers[name].room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax});
            var storageToRepair = towers[name].room.find(FIND_STRUCTURES, {
                                filter: (structure) => (structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax});    
                                
            // Attack closest Hostile
            var closestHostile = towers[name].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //console.log(closestHostile)
            if(closestHostile) 
            {
                towers[name].attack(closestHostile);
            }
        
            // Priotize Repairing Ramparts and Roads if no enemys, if no Roads or Ramparts, repair Walls if tower energy < 500 doesnt repair
            if(towers[name] && closestHostile == null && towers[name].store.getFreeCapacity(RESOURCE_ENERGY) < 500) 
            {  
                if (roadsToRepair.length !== 0)
                {
                    towers[name].repair(roadsToRepair[0]);
                }
                else
                {
                    if (storageToRepair.length !== 0)
                    {
                        towers[name].repair(storageToRepair[0]);
                    }            
                    if (containersToRepair.length !== 0 && storageToRepair.length == 0)
                    {
                        towers[name].repair(containersToRepair[0]);
                    }            
                    if (rampartsToRepair.length !== 0 && containersToRepair.length == 0 && storageToRepair.length == 0)
                    {
                        towers[name].repair(rampartsToRepair[0]);
                    }
    
                    if(wallsToRepair.length !== 0 && rampartsToRepair.length == 0 && containersToRepair.length == 0 && storageToRepair.length == 0) 
                    {
                         towers[name].repair(wallsToRepair[0]);
                    }
                }
            }
        }
    }    
    
}