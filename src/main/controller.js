const controllerSigns = require("../../ressource/controllersigns")





function setControllerSign(creep) {
    if (creep.room.controller) {
        if (!creep.room.controller.sign) {
            const randomIndex = Math.floor(Math.random() * controllerSigns.controllerSigns.length);
            if (creep.signController(creep.room.controller, controllerSigns.controllerSigns[randomIndex]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                return true;
            }
        }
    }
    return false
}


module.exports = { setControllerSign };
