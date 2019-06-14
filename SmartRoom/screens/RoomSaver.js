import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    AsyncStorage

} from 'react-native';
export default class RoomSaver {
    roomIds: [];

    constructor() {

        this.roomIds = [];
        this.retrieveData().then(
                console.log("Room IDS SIZE IS " + this.roomIds.length)
        );


    }
    saveRoom(roomId){
        console.log("This.roomids size is" + this.roomIds.length);
        this.roomIds.push(roomId);
        console.log("This.roomids size after is" + this.roomIds.length);
        console.log("ASYNC PUSH IS" + roomId);
        console.log("ASYNC string is" + JSON.stringify(this.roomIds));
        AsyncStorage.setItem('roomIds', '[' + this.roomIds.toString() + ']' );
    }



    getRoomIds(){


        this.roomIds= this.roomIds.filter(function(value, index, arr){

            return value !== "";

        });
        return this.roomIds;

    }


    retrieveData = async () => {
        try {
            const roomIds = await AsyncStorage.getItem('@MyStore:roomIds');
            if (roomIds !== null){
                // We have data!!
                this.roomIds = JSON.parse(roomIds);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
}