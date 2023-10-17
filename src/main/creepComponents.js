class CreepComponents {
    constructor(bodyParts, role) {
        this.bodyParts = bodyParts;
        this.role = role;

    }


}



function getCreepBody(arrayBodyparts) {
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
            quantity: 2,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }
    }, 2: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, builder: {
            priority: 4,
            quantity: 1,
            body: [WORK, MOVE, MOVE, CARRY, CARRY]
        }
    }, 3: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, MOVE, CARRY]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [CARRY, CARRY, CARRY, WORK, MOVE]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [WORK, MOVE, MOVE, CARRY, CARRY]
        }
    }, 4: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        }
    }, 5: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        }
    }, 6: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }
    }, 7: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 10,
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }
    }, 8: {
        harvester: {
            priority: 1,
            quantity: 100,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, transporter: {
            priority: 2,
            quantity: 2,
            body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, upgrader: {
            priority: 3,
            quantity: 1,
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, builder: {
            priority: 4,
            quantity: 2,
            body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }, claimer: {
            priority: 5,
            quantity: 1,
            body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM, CLAIM, CLAIM]
        }
    }

}


function getCreepComponents(roomLevel, role) {
    return new CreepComponents(creepBuilds[roomLevel][role].body, role)
}

module.exports = {
    getCreepComponents, creepBuilds
};
