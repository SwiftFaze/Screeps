const Memories = require('./memory')
const Spawners = require('./spawn')
const Towers = require('./tower')
const Links = require('./link')


module.exports.loop = function () {


    Memories.updateMemory();
    Spawners.spawnCreep();
    Spawners.runCreep();
    Towers.run();
    Links.run();


}
