import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,WebView,Dimensions,FlatList, TouchableOpacity, ScrollView,Alert} from 'react-native';

import {ListItem} from "react-native-elements";import Room from './Room'



const outerCircleDim = 250;
const innerCircleDim = 240;
const edgeMargin = 20;
const squareSide = (Dimensions.get('window').width)/2 - 40;


const roomData = [{

        roomName: 'Bedroom',
        key:0
    },
    {
        roomName: 'Kitchen',
        key:1

}
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





    render() {
        //this.props.navigation
        var {navigate} = this.props.navigation;
        const dummyRoom1 = new Room("Bedroom", 0);
        const dummyRoom2 = new Room("Kitchen", 1);
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