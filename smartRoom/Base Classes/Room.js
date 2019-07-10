class Room {


    constructor(name,identifier) {
        this.id = identifier;
        this.roomName = name;
        this.musicEnabled = false;
        this.lightEnabled = false;
        this.fanEnabled = false;
        this.partyEnabled = false;

    }



    set roomName(name) {

        this.RoomName = name.charAt(0).toUpperCase() + name.slice(1);
    }


    set musicEnabled(status) {
        if(typeof status  != "boolean"){
            return;
        }
        this.musicEnabled = status;
    }


    set lightEnabled(status) {
        if(typeof status  != "boolean"){
            return;
        }
        this.lightEnabled = status;
    }



    set fanEnabled(status) {
        if(typeof status  != "boolean"){
            return;
        }
        this.fanEnabled = status;
    }



    set partyEnabled(status) {
        if(typeof status  != "boolean"){
            return;
        }
        this.partyEnabled = status;
    }




}

module .exports = Room;