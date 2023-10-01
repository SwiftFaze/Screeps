const Memories = require('./memory')
const Spawners = require('./spawn')
const Towers = require('./tower')
const Links = require('./link')
const Observers = require('./observer')


module.exports.loop = function () {

    Observers.run();
    Memories.updateMemory();
    Spawners.spawnCreep();
    Spawners.runCreep();
    Towers.run();
    Links.run();



}
