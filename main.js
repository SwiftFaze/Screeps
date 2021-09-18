var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleammo = require('role.ammo');
var rolelinker = require('role.linker');
var rolelinker2 = require('role.linker2');
var roleExplorer = require('role.explorer');
var roleClaimer = require('role.claimer');
var roleLinkerExplorer = require('role.linkerexplorer');
var roleAttacker = require('role.attacker');
var roleExtractor = require('role.extractor');
var roleHealer = require('role.healer');

 

require('functions');
require('link');
require('tower');
require('spawn');
module.exports.loop = function () {
    


//================== MEMORY CLEAR ================

for (let name in Memory.creeps)
{
    if(Game.creeps[name] == undefined)
    {
        delete Memory.creeps[name];
    }
}


//===================== TOWER =====================

Tower();    




//==================== CREEP SPAWN =================

SpawningFunction();





//============ LINK =============
    
  var link = Game.rooms.W12N18.find(FIND_STRUCTURES, {
    filter: (structure) => 
        {
         return (structure.structureType == STRUCTURE_LINK)
        }
    });  
    Link(link[1], link[0]);
    Link(link[2], link[0]);
    
      var link = Game.rooms.W13N18.find(FIND_STRUCTURES, {
    filter: (structure) => 
        {
         return (structure.structureType == STRUCTURE_LINK)
        }
    });    
    Link(link[1], link[0]);
    Link(link[2], link[0]);
    



//============ Terminal =============    
    
    //console.log(Game.market.calcTransactionCost(100000, 'W13N18', 'W12N18'));
    Game.rooms['W13N18'].terminal.send(RESOURCE_ENERGY, 5000, 'W12N18','trade contract #1');
    
    



    
//============ LABS =============    
/*
    var labs = Game.rooms.W11N18.find(FIND_STRUCTURES, 
        {filter: {structureType: STRUCTURE_LAB}});
    if(labs[2].store[RESOURCE_LEMERGIUM] >= 2000 && labs[1].store[RESOURCE_OXYGEN] >= 2000)
    {
    labs[0].runReaction(labs[1], labs[2]);    
    }   
    
*/ 
    
    


//==================== MEMORY ASSIGNED TO ROLE ===================

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
    }



    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') 
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') 
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') 
        {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'ammo') 
        {
            roleammo.run(creep);
        }
        if(creep.memory.role == 'linker') 
        {
            rolelinker.run(creep);
        }
        if(creep.memory.role == 'linker2') 
        {
            rolelinker2.run(creep);
        }
        if(creep.memory.role == 'explorer') 
        {
            roleExplorer.run(creep);
        }
        if(creep.memory.role == 'claimer') 
        {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'linkerexplorer') 
        {
            roleLinkerExplorer.run(creep);
        }
        if(creep.memory.role == 'attacker') 
        {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'extractor') 
        {
            roleExtractor.run(creep);
        }
        if(creep.memory.role == 'healer') 
        {
            roleHealer.run(creep);
        }         
    }
}





