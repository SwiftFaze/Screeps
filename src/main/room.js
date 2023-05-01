


function getRoomList () {
    const roomList = []
    for(const room in Game.rooms){
        roomList.push(room)
    }
    return roomList;
}
module.exports = { getRoomList };
