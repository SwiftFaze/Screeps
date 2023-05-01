function run() {

    for (var room in Game.rooms) {
        var allRooms = Game.rooms[room];

        var towers = allRooms.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER)
            }
        });
        for (var tower in towers) {
            // Defining things to repair
            var rampartsToRepair = towers[tower].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_RAMPART) && structure.hits < 500
            });
            var roadsToRepair = towers[tower].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_ROAD) && structure.hits < structure.hitsMax
            });
            var wallsToRepair = towers[tower].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_WALL) && structure.hits < 4000
            });
            var containersToRepair = towers[tower].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax
            });
            var storageToRepair = towers[tower].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_STORAGE) && structure.hits < structure.hitsMax
            });

            // Attack closest Hostile
            var closestHostile = towers[tower].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //console.log(closestHostile)
            if (closestHostile) {
                towers[tower].attack(closestHostile);
            }

            // Priotize Repairing Ramparts and Roads if no enemys, if no Roads or Ramparts, repair Walls if tower energy < 500 doesnt repair
            if (towers[tower] && closestHostile == null && towers[tower].store.getFreeCapacity(RESOURCE_ENERGY) < 500) {
                if (roadsToRepair.length !== 0) {
                    towers[tower].repair(roadsToRepair[0]);
                } else {
                    if (storageToRepair.length !== 0) {
                        towers[tower].repair(storageToRepair[0]);
                    }
                    if (containersToRepair.length !== 0 && storageToRepair.length === 0) {
                        towers[tower].repair(containersToRepair[0]);
                    }
                    if (rampartsToRepair.length !== 0 && containersToRepair.length === 0 && storageToRepair.length === 0) {
                        towers[tower].repair(rampartsToRepair[0]);
                    }

                    if (wallsToRepair.length !== 0 && rampartsToRepair.length === 0 && containersToRepair.length === 0 && storageToRepair.length === 0) {
                        towers[tower].repair(wallsToRepair[0]);
                    }
                }
            }
        }
    }

}

module.exports = {run};
