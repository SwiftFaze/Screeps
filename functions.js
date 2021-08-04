
global.CreepMath = function () {
    let count = Math.floor(Math.random() * 100000);
    return count
}
global.CreepName = function (WantedName) {
    switch (WantedName) {
        case "Harvester":
            return "Harvester_" + CreepMath();
        case "Upgrader":
            return "Upgrader_" + CreepMath();
        case "Builder":
            return "Builder_" + CreepMath();
        case "Ammo":
            return "Ammo_" + CreepMath();
        case "Explorer":
            return "Explorer_" + CreepMath();
        case "Linker":
            return "Link_" + CreepMath();
        case "Linker2":
            return "Link_" + CreepMath();
        case "LinkerExplorer":
            return "LinkerExplorer_" + CreepMath();
        case "Attacker":
            return "Attacker_" + CreepMath();
        case "Extractor":
            return "Extractor_" + CreepMath();
        case "Healer":
            return "Healer_" + CreepMath();
    }

}






global.CreepAmount = function () {
    var NumberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var NumberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var NumberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'Builder');
    var NumberOfAmmoers = _.sum(Game.creeps, (c) => c.memory.role == 'ammo');
    var NumberOfLinkers = _.sum(Game.creeps, (c) => c.memory.role == 'linker');
    console.log("Number of Upgraders: ", NumberOfUpgraders, "\r\n", "Number of Harvesters: ", NumberOfHarvesters, "\r\n", "Number of Builders: ", NumberOfBuilders, "\r\n", "Number of Ammoers", NumberOfAmmoers, "\r\n", "Number of Linkers", NumberOfLinkers, "\r\n");
}



// dont work
global.CreepRatio = function (CreepType, CreepRoom) {

    var ExtensionTransfer = Game.rooms.W11N18.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION)
        }
    });

    var EnergyTotal = (ExtensionTransfer.length * 50)
    var Work = 100;
    var Carry = 50;
    var Move = 50;


    switch (CreepType) {
        case "Harvester":

            let WorkRatio = 2;
            var CarryRatio = 3;
            var MoveRatio = 1;

            var HarvesterWork = Work * WorkRatio;
            var HarvesterCarry = Carry * CarryRatio;
            var HarvesterMove = Move * MoveRatio;
            var HarvesterTotal = HarvesterCarry + HarvesterWork + HarvesterMove;

            var RatioMultiplier = Math.ceil(EnergyTotal / HarvesterTotal);

            WorkRatio = WorkRatio * RatioMultiplier;
            CarryRatio = CarryRatio * RatioMultiplier;
            MoveRatio = MoveRatio * RatioMultiplier;


            //console.log(Ratio);
            return [WorkRatio, CarryRatio, MoveRatio];

            break;
    }

}











global.CreepBodyParts = function (Toughness, Carrying, Claming, Attacking, RangedAttacking, Healing, Working, Moving) {
    let BodyParts = [];

    for (i = 0; i < Toughness; i++) {
        BodyParts.push(TOUGH);
    }
    for (i = 0; i < Carrying; i++) {
        BodyParts.push(CARRY);
    }
    for (i = 0; i < Claming; i++) {
        BodyParts.push(CLAIM);
    }
    for (i = 0; i < Attacking; i++) {
        BodyParts.push(ATTACK);
    }
    for (i = 0; i < RangedAttacking; i++) {
        BodyParts.push(RANGED_ATTACK);
    }
    for (i = 0; i < Healing; i++) {
        BodyParts.push(HEAL);
    }
    for (i = 0; i < Working; i++) {
        BodyParts.push(WORK);
    }
    for (i = 0; i < Moving; i++) {
        BodyParts.push(MOVE);
    }
    return BodyParts
}


global.CreepSpawnAmount = function (CreepType, RoomBalance) {

    switch (RoomBalance) {
        case 300: //Level 1
            switch (CreepType) {
                case "Harvester":
                    return 1
                case "Upgrader":
                    return 1
                case "Builder":
                    return 1
            }
            break;
        case 550: //Level 2
            switch (CreepType) {
                case "Harvester":
                    return 2
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
            }
            break;
        case 800: //Level 3
            switch (CreepType) {
                case "Harvester":
                    return 2
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
            }
            break;
        case 1300: //Level 4
            switch (CreepType) {
                case "Harvester":
                    return 2
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
                case "Ammo":
                    return 1
            }
            break;
        case 1800: //Level 5
            switch (CreepType) {
                case "Harvester":
                    return 2
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
                case "Linker":
                    return 1
                case "Linker2":
                    return 1
                case "Ammo":
                    return 1
            }
            break;
        case 2300: //Level 6
            switch (CreepType) {
                case "Harvester":
                    return 1
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
                case "Linker":
                    return 1
                case "Linker2":
                    return 1
                case "Ammo":
                    return 1
            }
            break;
        case 5600: //Level 7
            switch (CreepType) {
                case "Harvester":
                    return 1
                case "Upgrader":
                    return 2
                case "Builder":
                    return 1
                case "Linker":
                    return 1
                case "Linker2":
                    return 1
                case "Ammo":
                    return 1
            }
            break;
        case 12900: //Level 8
            switch (CreepType) {
                case "Harvester":
                    return 1
                case "Upgrader":
                    return 1
                case "Builder":
                    return 1
                case "Linker":
                    return 1
                case "Linker2":
                    return 1
                case "Ammo":
                    return 1
            }
            break;

    }
}



global.RoomBalance = function (ThisRoom) {
    var RoomBalance;
    var ControllerLevel = [300, 300, 550, 800, 1300, 1800, 2300, 5600, 12900]
    let Amount = Game.rooms[ThisRoom].energyCapacityAvailable

    for (i = 1; i < ControllerLevel.length; i++) {
        if (Amount >= ControllerLevel[i]) {
            RoomBalance = ControllerLevel[i]
        }
    }

    return RoomBalance;
}

global.CreepMaker = function (ThisRoom, RoomBalance, CreepType) {





    // ADD MORE CASE "CREEPTYPE"



    var SpawnName
    switch (ThisRoom) {
        case "W12N18":
            if(Game.spawns.Spawn2.spawning == null)  //need to change
            {
                SpawnName = Game.spawns.Spawn2;
                break;
            }
            else
            {
                SpawnName =Game.spawns.Spawn21;
                break;
            }
        case "W13N18":
            SpawnName = Game.spawns.Spawn3;
            break;
    }


    switch (RoomBalance) {
        //Toughness,Carrying,Claming,Attacking,RangedAttacking,Healing,Working,Moving
        case 300:
            switch (CreepType) {

                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 1, 0, 0, 0, 0, 1, 1), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 1, 0, 0, 0, 0, 1, 1), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 1, 0, 0, 0, 0, 1, 1), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
            }
            break;
        case 550:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 5, 0, 0, 0, 0, 2, 2), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 5, 0, 0, 0, 0, 2, 2), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 5, 0, 0, 0, 0, 2, 2), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
            }
            break;
        case 800:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 2, 4), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 2, 4), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 2, 4), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
            }
            break;
        case 1300:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 6, 4), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 6, 4), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 3, 4), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
                case "Ammo":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 0, 4), CreepName("Ammo"), { memory: { role: 'ammo' } });
                    break;
            }
            break;
        case 1800:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 5, 4), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 5, 4), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 2), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
                case "Linker":
                    SpawnName.spawnCreep(CreepBodyParts(0, 4, 0, 0, 0, 0, 4, 2), CreepName("Linker"), { memory: { role: 'linker' } });
                    break;
                case "Ammo":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 0, 4), CreepName("Ammo"), { memory: { role: 'ammo' } });
                    break;
            }
            break;
        case 2300:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 5, 4), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 8, 6), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 2), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
                case "Linker":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker"), { memory: { role: 'linker' } });
                    break;
                case "Linker2":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker2"), { memory: { role: 'linker2' } });
                    break;
                case "Ammo":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 0, 6), CreepName("Ammo"), { memory: { role: 'ammo' } });
                    break;
            }
            break;
        case 5600:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 6, 0, 0, 0, 0, 5, 4), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 8, 6), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 4), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
                case "Linker":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker"), { memory: { role: 'linker' } });
                    break;
                case "Linker2":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker2"), { memory: { role: 'linker2' } });
                    break;
                case "Ammo":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 0, 6), CreepName("Ammo"), { memory: { role: 'ammo' } });
                    break;
            }
            break;
        case 12900:
            switch (CreepType) {
                case "Harvester":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 6), CreepName("Harvester"), { memory: { role: 'harvester' } });
                    break;
                case "Upgrader":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 8, 6), CreepName("Upgrader"), { memory: { role: 'upgrader' } });
                    break;
                case "Builder":
                    SpawnName.spawnCreep(CreepBodyParts(0, 8, 0, 0, 0, 0, 6, 4), CreepName("Builder"), { memory: { role: 'builder' } });
                    break;
                case "Linker":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker"), { memory: { role: 'linker' } });
                    break;
                case "Linker2":
                    SpawnName.spawnCreep(CreepBodyParts(0, 2, 0, 0, 0, 0, 10, 2), CreepName("Linker2"), { memory: { role: 'linker2' } });
                    break;
                case "Ammo":
                    SpawnName.spawnCreep(CreepBodyParts(0, 10, 0, 0, 0, 0, 0, 6), CreepName("Ammo"), { memory: { role: 'ammo' } });
                    break;
            }





    }

}





























global.CreepPriority = function (CreepType, WantedCreepAmount) {
    //Put this in a function maybe???
    {
        var NumberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var NumberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var NumberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'Builder');
        var NumberOfAmmoers = _.sum(Game.creeps, (c) => c.memory.role == 'ammo');
        var NumberOfLinkers = _.sum(Game.creeps, (c) => c.memory.role == 'linker');
        var NumberOfExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'explorer');


    }




    //No_Creeps
    if (CreepType == "No_Creeps") {
        if (NumberOfHarvesters == 0)
            return true;
        else
            return false;
    }



    //HARVESTER
    if (CreepType == "Harvester") {
        if (NumberOfHarvesters <= (WantedCreepAmount - 1))
            return true;
        else
            return false;
    }

    //AMMOER
    if (CreepType == "Ammoer") {
        if (NumberOfAmmoers <= (WantedCreepAmount - 1)) {
            return true;
        }
        else
            return false;
    }

    //LINKER
    if (CreepType == "Linker") {
        if (NumberOfLinkers <= (WantedCreepAmount - 1))
            return true;
        else
            return false;
    }
    //UPGRADER
    if (CreepType == "Upgrader") {
        if (NumberOfUpgraders <= (WantedCreepAmount - 1))
            return true;
        else
            return false;
    }
    //Builder
    if (CreepType == "Builder") {
        if (NumberOfBuilders <= (WantedCreepAmount - 1))
            return true;
        else
            return false;
    }
    //EXPLORER
    if (CreepType == "Explorer") {
        if (NumberOfExplorers <= (WantedCreepAmount - 1))
            return true;
        else
            return false;
    }
}





