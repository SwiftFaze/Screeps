const { hasLink, getCreepName, getClosestBasicStructure } = require('../creep');
require('screeps');




describe('hasLink function', () => {
    it('should return true if creep is linked', () => {
        const creep = { memory: { linked: true } };
        expect(hasLink(creep)).toBe(true);
    });

    it('should return false if creep is not linked', () => {
        const creep = { memory: { linked: false } };
        expect(hasLink(creep)).toBe(false);
    });
});

describe('getCreepName', () => {
    test('should return a string with the first letter capitalized and a random string of length 5', () => {
        const role = 'harvester';
        const creepName = getCreepName(role);

        expect(typeof creepName).toBe('string');
        expect(creepName.charAt(0)).toBe(role.charAt(0).toUpperCase());
        expect(creepName.slice(2)).toHaveLength(5);
    });
});

describe('getClosestBasicStructure', () => {
    const fakeCreep = {
        room: {
            find: jest.fn().mockReturnValue([
                { id: '1', structureType: STRUCTURE_EXTENSION, pos: { x: 10, y: 10 } },
                { id: '2', structureType: STRUCTURE_EXTENSION, pos: { x: 15, y: 15 } },
                { id: '3', structureType: STRUCTURE_EXTENSION, pos: { x: 20, y: 20 } },
            ]),
        },
        pos: { x: 5, y: 5 },
    };

    it('returns the closest basic structure of the given type', () => {
        const closestStructure = getClosestBasicStructure(fakeCreep, STRUCTURE_EXTENSION);
        expect(closestStructure.id).toBe('1');
    });

    it('returns null if no basic structure of the given type is found', () => {
        const closestStructure = getClosestBasicStructure(fakeCreep, STRUCTURE_EXTENSION);
        expect(closestStructure).toBeNull();
    });
});
