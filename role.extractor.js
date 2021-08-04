
var roleExtractor = {


/* @param {Creep} creep */  
run: function(creep) 
{

    
    var LabTransfer = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => 
        {
            return (structure.structureType == STRUCTURE_LAB)  
        }
    });    
    
    var StorageTransfer = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => 
        {
            return (structure.structureType == STRUCTURE_STORAGE && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY)) > 0  
        }
    });
    
    
    var sources = creep.room.find(FIND_MINERALS);

    
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

//console.log(creep.store[RESOURCE_LEMERGIUM])
    if( creep.room == "[room W11N18]")
    {
        if (LabTransfer[0].store[RESOURCE_LEMERGIUM_OXIDE] >= 2000)
        {
            if (creep.memory.harvesting == false)
            {
                if(creep.withdraw(LabTransfer[0], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(LabTransfer[0]);         
                }
            }
        }
        
        
        
        
        
        
        if (LabTransfer[0].store[RESOURCE_LEMERGIUM_OXIDE] >= 2000)
        {
            if (creep.memory.harvesting == false)
            {
                if(creep.withdraw(LabTransfer[0], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(LabTransfer[0]);         
                }
            }
        }
        else
        {
            if(creep.memory.harvesting == false && LabTransfer[2].store[RESOURCE_LEMERGIUM] < 2000) 
            {
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[0]);         
                }
            }
            if(creep.memory.harvesting == true )
            {
                if(creep.store.LO == 250)
                {
                    if(creep.transfer(StorageTransfer[0], RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(StorageTransfer[0]);    
                    }
                }
                if(creep.store.L == 250)
                {
/*
                    if(creep.transfer(StorageTransfer[0], RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(StorageTransfer[0]);    
                    }
*/
                    if(creep.transfer(LabTransfer[2], RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(LabTransfer[2]);    
                    }                    

                }

                if(creep.store.O == 250)
                {
                    if (LabTransfer[1].store[RESOURCE_OXYGEN] != 3000)
                    {
                        if(creep.transfer(LabTransfer[1], RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(LabTransfer[1]);    
                        }
                    }
                }
            } 
            
            
            if(creep.memory.harvesting == false && LabTransfer[2].store[RESOURCE_LEMERGIUM] > 2000) 
            {
                const exitDir = creep.room.findExitTo("W12N18",FIND_EXIT_LEFT);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);            
            }
            
        }
        
    }
    
    if( creep.room == "[room W12N18]")
    {
        if(creep.memory.harvesting == false)
        {
            if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[0]);         
            }
        }
        else
        {
            const exitDir = creep.room.findExitTo("W11N18",FIND_EXIT_RIGHT);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);  
        }              
    }






}

};
module.exports = roleExtractor;
