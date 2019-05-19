class User {


    /**
     * private String firstName;
     private String lastName;
     private String email;
     private String password;
     private String roomIds;
     */
    firstName = "";
    lastName = "";
    email = "";
    password = "";
    roomIds = [];
    constructor(email,password) {
        this.firstName = "";
        this.lastName = "";
        this.email = email;
        this.password = password;
        this.roomIds = []


    };





    addRoom(roomId){
        if(typeof roomId != "string"){
            return;
        }
        this.roomIds.push(roomId);
    }


    isComplete(){
        return this.firstName != "" && this.lastName != "" && this.email != "" && this.password != "";
    }







}

module .exports = User;