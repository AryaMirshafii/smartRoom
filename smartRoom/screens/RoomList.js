import React, {Component} from 'react';
import {Platform, StyleSheet, Text, AsyncStorage, View,WebView,Dimensions,FlatList, TouchableOpacity, ScrollView,Alert} from 'react-native';

import {ListItem} from "react-native-elements";import Room from './Room'



const outerCircleDim = 250;
const innerCircleDim = 240;
const edgeMargin = 20;
const squareSide = (Dimensions.get('window').width)/2 - 40;


/*
const roomData = [{

        roomName: 'Bedroom',
        key:0
    },
    {
        roomName: 'Kitchen',
        key:1

}
];*/
const roomData = [
    {

    name: 'Add Room',
    key:0

    },
]


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
        this.userUrl = 'https://67nypadvwj.execute-api.us-east-1.amazonaws.com/dev/users';
        this.hasRooms = false;



    }

    getData = async () => {
        try {
            this.userId = await AsyncStorage.getItem('id');

        } catch (error) {
            // Error retrieving data
        }
    };



    componentDidMount = () => {
        this.getData().then(() =>{
                console.log("HIIIII");
                this.userUrl = this.userUrl +'/' +  this.userId;
                var {navigate} = this.props.navigation;
                fetch(this.userUrl)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log("ME RESPONSE ES" + responseJson["roomIds"]);

                        let roomIds = responseJson["roomIds"];
                        console.log("Room ids for this user are: " + roomIds);



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




    render() {

        this.getData().then(() =>{
                console.log("HIIIII");
                this.userUrl = this.userUrl +'/' +  this.userId;
                var {navigate} = this.props.navigation;
                fetch(this.userUrl)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log("ME RESPONSE ES" + responseJson["roomIds"]);

                        let roomIds = responseJson["roomIds"];
                        console.log("Room ids for this user are: " + roomIds);



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



        //this.props.navigation
        var {navigate} = this.props.navigation;
        const dummyRoom1 = new Room("Bedroom", 0);
        const dummyRoom2 = new Room("Kitchen", 1);

        if(this.hasRooms){
            return (
                <FlatList
                    style = {styles.mainView}
                    data={roomData}
                    renderItem={({item}) =>

                        <TouchableOpacity style={styles.roomListItem} onPress={
                            ()=>navigate("Fourth", {
                                roomName: item.name,
                            })

                        }>
                            <Text style = {styles.roomListText}>{item.roomName}</Text>
                        </TouchableOpacity>




                    }
                    keyExtractor={(item, index) => index.toString()}


                />
            );
        }

        return (
            <FlatList
                style = {styles.mainView}
                data={roomData}
                renderItem={({item}) =>

                    <TouchableOpacity style={styles.roomListItem}onPress={
                        ()=>navigate("AddRoom", {

                        })

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