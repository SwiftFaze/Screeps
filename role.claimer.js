
var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        
        var roomcontroller = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_CONTROLLER)
            }});      
        

        
        if(creep.memory.homeRoom == undefined)
        {
            creep.memory.homeRoom = creep.room.name;
        }          
          

        if (creep.room == "[room W11N18]")
        {
            const exitDir = creep.room.findExitTo("W12N18",FIND_EXIT_LEFT);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
        }
        
        
        if (creep.room == "[room W12N18]")
        {
            creep.moveTo(new RoomPosition(0,4, "W12N18"));
        }
        
        if (creep.room == "[room W13N18]" )
        {   
            
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller);
                
            }
        
        
            if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller);
                
            }
        } 
    }
};   
module.exports = roleClaimer;




//Game.spawns.Spawn2.createCreep(HarvesterBodyParts(0,0,4,0,0,0,0,1),  "Claimer", {role: 'claimer'});
