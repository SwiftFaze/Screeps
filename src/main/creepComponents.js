class CreepComponents {
    constructor(bodyParts, role) {
        this.bodyParts = bodyParts;
        this.role = role;

    }

    // bodyParts
    // role


}

// const CREEP_BODY_PARTS = {
//     WORK: WORK,
//     MOVE: 'MOVE,
//     CARRY: 'CARRY,
//     ATTACK: 'ATTACK,
//     RANGED_ATTACK: RANGED_ATTACK,
//     HEAL: HEAL,
//     TOUGH: TOUGH,
//     CLAIM: 'CLAIM'
// }


function getCreepBody(arrayBodyparts)
{
    return _.reduce(arrayBodyparts, (result, bodypartCount, bodypartName) => result.concat(new Array(bodypartCount).fill(global[bodypartName])), []);
}



const creepBuilds = {

    1: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 12,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }
    }, 2: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 12,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }
    }, 3: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 12,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, builder: {
            priority: 3,
            quantity: 2,
            body: [WORK, MOVE, MOVE, CARRY, CARRY]
        }
    }, 4: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 6,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
        }, builder: {
            priority: 1,
            quantity: 1,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
        }
    }

}


function getCreepComponents(roomLevel, role) {
    return new CreepComponents(creepBuilds[roomLevel][role].body, role)
}

module.exports = {
    getCreepComponents, creepBuilds
};
