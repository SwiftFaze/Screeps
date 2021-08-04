require('functions');


global.SpawningFunction = function () {
    let count = Math.floor(Math.random() * 100000);

    for (var name in Game.rooms) {
        var allrooms = Game.rooms[name];

        var NumberOfHarvestersInMainRoom = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.homeRoom == allrooms.name);

        //console.log(NumberOfHarvestersInMainRoom + " in " + allrooms.name);
        //console.log(allrooms.energyCapacityAvailable);










        var NumberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.homeRoom == allrooms.name);
        var NumberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.homeRoom == allrooms.name);
        var NumberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.homeRoom == allrooms.name);
        var NumberOfAmmoers = _.sum(Game.creeps, (c) => c.memory.role == 'ammo' && c.memory.homeRoom == allrooms.name);
        var NumberOfLinkers = _.sum(Game.creeps, (c) => c.memory.role == 'linker' && c.memory.homeRoom == allrooms.name);
        var NumberOfLinkerExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'linkerexplorer' && c.memory.homeRoom == allrooms.name);
        var NumberOfExtractors = _.sum(Game.creeps, (c) => c.memory.role == 'extractor' && c.memory.homeRoom == allrooms.name);
        var NumberOfExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'explorer' && c.memory.homeRoom == allrooms.name);
        var NumberOfAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && c.memory.homeRoom == allrooms.name);
        var NumberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer' && c.memory.homeRoom == allrooms.name);
        var NumberOfLinkers2 = _.sum(Game.creeps, (c) => c.memory.role == 'linker2' && c.memory.homeRoom == allrooms.name);


        var WantedHarvesters = 2;
        var WantedUpgraders = 1;
        var WantedBuilders = 1;
        var WantedAmmoers = 1;
        var WantedLinkers = 1;
        var WantedLinkerExplorers = 0;
        var WantedExtractors = 1;
        var WantedExplorers = 0;
        var WantedAttackers = 0;
        var WantedHealers = 0;

        let Harvestercount = "Harvester_" + count;
        let Upgradercount = "Upgrader_" + count;
        let Buildercount = "Builder_" + count;
        let Ammocount = "Ammo_" + count;
        let Linkercount = "Link_" + count;
        let Explorercount = "Explorer_" + count;
        let LinkerExplorercount = "LinkerExplorer_" + count;
        let Attackercount = "Attacker_" + count;
        let Extractorcount = "Extractor_" + count;
        let Healercount = "Healer_" + count;



        for (var name in Game.spawns) {
            var allspawns = Game.spawns[name].name;
        }



        if (allrooms.name == "W12N18") {
            allrooms.energyCapacityAvailable
            




            if (NumberOfHarvesters == 0 && Game.spawns.Spawn2.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 6), CreepName("Harvester"), { memory: { role: 'harvester' } }) != 0 ) {
                Game.spawns.Spawn2.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 1, 2), CreepName("Harvester"), { memory: { role: 'harvester' } });
            }
           else {
                if (NumberOfHarvesters < CreepSpawnAmount('Harvester', RoomBalance(allrooms.name))) {
                    CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Harvester');
                }
                else {
                    if (NumberOfAmmoers < CreepSpawnAmount('Ammo', RoomBalance(allrooms.name))) {
                        CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Ammo');
                    }
                    else {
                        if (NumberOfLinkers < CreepSpawnAmount('Linker', RoomBalance(allrooms.name))) {
                            CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Linker');
                        }
                        else {
                            if (NumberOfLinkers2 < CreepSpawnAmount('Linker2', RoomBalance(allrooms.name))) {
                                CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Linker2');
                            }
                            else {
                                if (NumberOfUpgraders < CreepSpawnAmount('Upgrader', RoomBalance(allrooms.name))) {
                                    CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Upgrader');
                                }
                                else {
                                    if (NumberOfBuilders < CreepSpawnAmount('Builder', RoomBalance(allrooms.name))) {
                                        CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Builder');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }




        if (allrooms.name == "W13N18") {
            allrooms.energyCapacityAvailable
            




            if (NumberOfHarvesters == 0 && Game.spawns.Spawn3.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 6), CreepName("Harvester"), { memory: { role: 'harvester' } }) != 0 ) {
                Game.spawns.Spawn3.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 1, 2), CreepName("Harvester"), { memory: { role: 'harvester' } });
            }
            else {
                if (NumberOfHarvesters < CreepSpawnAmount('Harvester', RoomBalance(allrooms.name))) {
                    CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Harvester');
                }
                else {
                    if (NumberOfAmmoers < CreepSpawnAmount('Ammo', RoomBalance(allrooms.name))) {
                        CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Ammo');
                    }
                    else {
                        if (NumberOfLinkers < CreepSpawnAmount('Linker', RoomBalance(allrooms.name))) {
                            CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Linker');
                        }
                        else {
                            if (NumberOfLinkers2 < CreepSpawnAmount('Linker2', RoomBalance(allrooms.name))) {
                                CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Linker2');
                            }
                            else {
                                if (NumberOfUpgraders < CreepSpawnAmount('Upgrader', RoomBalance(allrooms.name))) {
                                    CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Upgrader');
                                }
                                else {
                                    if (NumberOfBuilders < CreepSpawnAmount('Builder', RoomBalance(allrooms.name))) {
                                        CreepMaker(allrooms.name, RoomBalance(allrooms.name), 'Builder');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}