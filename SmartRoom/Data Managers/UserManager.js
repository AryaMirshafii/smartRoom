import { AsyncStorage } from "react-native";
import User from '../Base Classes/User'

export default class UserManager {

    constructor(){

        this.user = new User();
        this.getUser();
        if(this.isLoginValid()){

            console.log("User Has Logged in")
        }else{
            console.log("User Has Not Logged in")
        }
    }
    /**
     * private String firstName;
     private String lastName;
     private String email;
     private String password;
     private String roomIds;
     */


    isLoginValid(){

        return this.user.isComplete()
    }

    getUser(){

        var retrieveData = async () => {
            try {
                const firstName = await AsyncStorage.getItem('firstName');
                const lastName = await AsyncStorage.getItem('lastName');
                const email = await AsyncStorage.getItem('email');
                const password = await AsyncStorage.getItem('password');
                const roomIds = await AsyncStorage.getItem('roomIds');
                if (value !== null) {
                    //Our data is fetched successfully
                    this.user.firstName = firstName;
                    this.user.lastName = lastName;
                    this.user.email = email;
                    this.user.password = password;
                    this.user.roomIds = roomIds;
                }
            } catch (error) {
                // Error retrieving data
            }


        }

    }
}

