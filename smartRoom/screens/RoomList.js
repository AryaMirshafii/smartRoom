import React, {Component} from 'react';
let Configs = require('../config.js');
import {Platform, StyleSheet, Text, AsyncStorage, View,WebView,Dimensions,FlatList, TouchableOpacity, ScrollView,Alert} from 'react-native';

import {ListItem} from "react-native-elements";

import RoomController from "../Data Managers/RoomManager"

const outerCircleDim = 250;
const innerCircleDim = 240;
const edgeMargin = 20;
const squareSide = (Dimensions.get('window').width)/2 - 40;

var keyIndex = 0;
const roomData = [
    {

    name: 'Add Room',
    key: keyIndex,
        id: ''

    },
];


export default class RoomList extends React.Component {

    static navigationOptions = {
        title: 'Rooms',
        headerStyle: {
            backgroundColor: '#000000'
        },
        headerLeft: null,

        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }

    constructor(props) {
        super(props);
        this.roomController = new RoomController();
        this.hasRooms = false;

        this.state = {
            roomName   : '',

            userId: '',
            userFirstName   : '',
            userLastName: '',
            userEmail:'',
            userPassword:'',
            userRoomIds:[],

        }
        this.getRooms();
        //this.loadRooms();

    }

    getData = async () => {
        try {
            this.userId = await AsyncStorage.getItem('id');

        } catch (error) {
            // Error retrieving data
        }
    };



    _storeData = async (roomId, roomName) => {
        if(roomId && roomName){
            try {
                await AsyncStorage.setItem(roomId, roomName);




            } catch (error) {
                // Error saving data
            }
        }else{
            console.log("The provided roomId or roomName is null");
        }

    };


    getRooms(){
        this.getData().then(() =>{


                var {navigate} = this.props.navigation;
                fetch(Configs.default.USER_URL +'/' +  this.userId)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log("ME RESPONSE ES" + responseJson["roomIds"]);

                        var roomIds = ''  + responseJson["roomIds"];
                        roomIds = roomIds.replace('[', '');
                        roomIds = roomIds.replace(']', '');
                        roomIds = roomIds.replace(' ', '');
                        console.log("Room ids for this user are: " + roomIds);
                        this.setState({userRoomIds :roomIds.split(",")})
                        console.log("USer has " + this.state.userRoomIds.length + "rooms");

                        this.loadRooms();
                        if(roomIds ===   "\[\"\"]" ) {
                            console.log("Room ids for this user are: room ids are empty");

                        }else{
                            this.hasRooms = true;
                        }






                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }

        )
    }


    loadRooms(){
        for(var i = 0; i < this.state.userRoomIds.length; i++){
            console.log("looking at:" + this.state.userRoomIds[i]);

            fetch(Configs.default.ROOM_URL + '/' + this.state.userRoomIds[i])
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log("ME RESPONSE ES" + responseJson["roomIds"]);
                    if(responseJson["name"]){
                        let roomName = ''  + responseJson["name"];
                        let roomId = ''  + responseJson["id"];
                            console.log("Room name is: " + roomName);
                        this._storeData(this.state.userRoomIds[i],roomName ).then();


                        roomData.push({
                            name: roomName,
                            key: ++keyIndex,
                            id: roomId

                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }


    NavigateToScreen(roomItem){
        var {navigate} = this.props.navigation;
        if(roomItem.name === 'Add Room' && roomItem.key === 0){
            navigate("AddRoom", {
                roomName: roomItem.name,
            })
        }else{
            navigate("Fourth", {
                roomName: roomItem.name,
                roomId: roomItem.id
            })
        }

    }








    render() {

        return (
            <FlatList
                style = {styles.mainView}
                data={roomData}
                renderItem={({item}) =>

                    <TouchableOpacity style={styles.roomListItem} onPress={
                        ()=>this.NavigateToScreen(item)

                    }>
                        <Text style = {styles.roomListText}>{item.name}</Text>
                    </TouchableOpacity>


                }
                keyExtractor={(item, index) => index.toString()}


            />
        );
    }

}



const styles = StyleSheet.create({



    mainView: {


        //backgroundColor: '#000000',
        backgroundColor: '#000000',
    },
    container: {

        flex: 1,

        alignItems: 'center',
        backgroundColor: '#000000',
    },
    roomListItem:{

        marginBottom: 5,

        marginLeft:4,
        marginRight:4,
        height:100,
        backgroundColor:'#3D4144'
    },


    roomListText:{
        marginTop:20,
        height:100,

        fontSize: 40,
        textAlign: 'center',
        color: '#E8EFE5',
    },

});


const buttonStyles = StyleSheet.create({
    leftButton:{
        marginLeft:20,
        marginTop:20,
        marginRight:20,
        backgroundColor: '#3D4144',

        width: squareSide,
        height: squareSide,
        borderRadius: 15,
    },

    rightButton:{
        marginLeft:20,
        marginTop:20,
        marginRight:20,
        backgroundColor: '#3D4144',

        width: squareSide,
        height: squareSide,
        borderRadius: 15,
    },

    buttonRow: {
        flexDirection: 'row',
    },

    buttonColumn: {
        flexDirection: 'column',
    },

    buttonText:{
        marginTop:10,
        textAlign: 'center',
        color: '#E8EFE5',
        fontSize: 25,
    },
});