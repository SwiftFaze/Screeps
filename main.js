const Memories = require('memory')
const Spawners = require('spawn')
const Towers = require('tower')


module.exports.loop = function () {






    Memories.updateMemory();
    Spawners.spawnCreep();
    Spawners.runCreep();
    Towers.run();


  


}
