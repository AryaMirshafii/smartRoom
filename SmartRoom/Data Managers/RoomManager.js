import {
    AsyncStorage

} from 'react-native';

import Room from '../Base Classes/Room';
export default class RoomManager{

    constructor(){
        this.getRoomKeys().then((roomKeys) => {
            this.roomKeys = roomKeys;
        }).catch((error) => {
            console.log('getRoomKeys Promise is rejected with error: ' + error);
        });

        this.getRooms().then((rooms) => {
            this.rooms = rooms;
        }).catch((error) => {
            console.log('getrooms Promise is rejected with error: ' + error);
        });
    }


    async getRoom(roomId){
        try {
            let roomKeysArray = await AsyncStorage.getItem(roomId);
            return roomKeysArray;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getRooms(){
        let roomIdsToReturn = [];
        for(let roomKey in this.roomKeys){
            await this.getRoom(roomKey).then((room) => {
                roomIdsToReturn.push(room);
            }).catch((error) => {
                console.log('getRoomKeys Promise is rejected with error: ' + error);
            });
        }
        return roomIdsToReturn;

    }

    async addToRoomKeys(roomId){
        let roomKeys = [];
        roomKeys = AsyncStorage.getItem("roomKeys");
        if(!roomKeys){
            roomKeys = [];
        }
        roomKeys.push(roomId);

        try {
            await AsyncStorage.setItem("roomKeys", JSON.stringify(roomKeys));
        } catch (error) {
            console.log(error.message);
        }

    }


    async getRoomKeys(){

        try {
            let roomKeysArray = await AsyncStorage.getItem("roomKeys");
            return roomKeysArray;
        } catch (error) {
            console.log(error.message);
        }

    }


    async addRoom(roomToAdd){
        if(!(roomToAdd instanceof Room)){
            return;
        }
        try {
            var jsonOfItem = await AsyncStorage.setItem(roomToAdd.id, JSON.stringify(roomToAdd));
            return jsonOfItem;
        }
        catch (error) {
            console.log("Failed to add room" + error.message);
        }
    }





}