
var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        

  
       
         
        var SpawnTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_SPAWN)}});
        var ExtensionTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_EXTENSION)}});
        var TowerTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_TOWER)}});
        var StorageTransfer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_STORAGE)}});
        var RoomController = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_CONTROLLER)}});        
            




        
      
        
        if(creep.memory.homeRoom == undefined)
        {
            creep.memory.homeRoom = creep.room.name;
        }          

        if (creep.room == "[room W11N18]")
        {
            /*creep.moveTo(new RoomPosition(0,26, "W11N18"));
        }
        if (creep.room == "[room W12N18]")
        {
            creep.moveTo(new RoomPosition(36,49, "W12N18"));
        }
        if (creep.room == "[room W12N17]")
        {
            creep.moveTo(new RoomPosition(20,49, "W12N17"));
        }
        
        if (creep.room == "[room W12N16]")
        {
       */
        
        
        
        
            
            const target = creep.room.find(FIND_HOSTILE_CREEPS);
            console.log(target)
            if(target) 
            {
                if(creep.rangedAttack(target[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(target[0]);
                }
            }
            else
            {

                if(TowerTransfer[0])
                {
                    if(creep.rangedAttack(TowerTransfer[0]) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(TowerTransfer[0]);
                    }
                }                
                else
                {                
                    if(SpawnTransfer[0])
                    {
                        if(creep.rangedAttack(SpawnTransfer[0]) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(SpawnTransfer[0]);
                        }
                    }
                    else
                    {
                        if(ExtensionTransfer[0])
                        {
                            if(creep.rangedAttack(ExtensionTransfer[0]) == ERR_NOT_IN_RANGE) 
                            {
                                creep.moveTo(ExtensionTransfer[0]);
                            }
                        }
                        else
                        {
                            if(StorageTransfer[0])
                            {
                                if(creep.rangedAttack(StorageTransfer[0]) == ERR_NOT_IN_RANGE) 
                                {
                                    creep.moveTo(StorageTransfer[0]);
                                }
                            }                            
                        }
                    }    
                }
            }    
        }
       
    }
};   
module.exports = roleAttacker;




//Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE, MOVE], "Explorer", {role: 'explorer'});
