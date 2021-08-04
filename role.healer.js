var roleHealer = {

    run: function(creep) 
    {
    let target = _.filter(Game.creeps, (c) => c.memory.role == 'attacker');
    
        if(target) 
        {
            if(creep.heal(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0])};
        }

    }
};
module.exports = roleHealer;