global.statuses = {
    status: '<span style="color: lightblue">[STATUS]</span>',
    warning: '<span style="color: orangered">[WARN]</span>',
    error: '<span style="color: red">[ERROR]</span>',
    complete: '<span style="color: green">[COMPLETE]</span>',
    success: '<span style="color: green">[SUCCESS]</span>'
}

global.logMessages = {
    memoryClear: '<span style="font-weight: bold">Memory has been cleared</span>'
}


function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seconds
}


global.printLog = function (status, msg, optionalMsg) {
    if (optionalMsg) {
        console.log(status + ' - ' + msg + ' : ' + optionalMsg);
    } else {
        console.log(status + ' - ' + msg);
    }
}


global.getSpawnStatus = function (spawn, code) {
    if (isDebugMode()) {
        switch (code) {
            case 0:
                printLog(statuses.success, 'Creep has been spawned', spawn);
                break;
            case -1:
                printLog(statuses.error, 'You are not the owner of this spawn.', spawn);
                break;
            case -3:
                printLog(statuses.error, 'There is a creep with the same name already.', spawn);
                break;
            case -4:
                printLog(statuses.warning, 'The spawn is already in process of spawning another creep.', spawn);
                break;
            case -6:
                printLog(statuses.error, 'The spawn and its extensions contain not enough energy to create a creep with the given body.', spawn);
                break;
            case -10:
                printLog(statuses.error, 'Body is not properly described.', spawn);
                break;
            case -14:
                printLog(statuses.error, 'Your Room Controller level is insufficient to use this spawn.', spawn);

        }
    }


}
