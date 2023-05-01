const Memories = require('src/main/memory')
const Spawners = require('src/main/spawn')
const Towers = require('src/main/tower')


module.exports.loop = function () {






    Memories.updateMemory();
    Spawners.spawnCreep();
    Spawners.runCreep();
    Towers.run();


  


}
