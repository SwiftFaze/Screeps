function run() {





    for (var room in Game.rooms) {
        var allRooms = Game.rooms[room];

        var observer = allRooms.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_OBSERVER)
            }
        });

        console.log(observer)


    }

}

module.exports = {run};
