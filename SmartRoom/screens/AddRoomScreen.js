import React, { Component } from 'react';
let Configs = require('../config.js');
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

import RoomSaver from './RoomSaver.js'

export default class AddRoomScreen extends Component {
    static navigationOptions = {

        headerStyle: {

            backgroundColor: '#000000'
        },
        title:"Add A Room",


        headerTintColor: '#B9324B',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }
    constructor(props) {
        super(props);
        this.roomSaver = new RoomSaver();
        this.postUrl = 'https://j9mr11cl24.execute-api.us-east-1.amazonaws.com/dev/rooms';
        this.userUrl = 'https://j9mr11cl24.execute-api.us-east-1.amazonaws.com/dev/users';
        this.userRoomIds = [];
        this.state = {
            roomName   : '',

            userId: '',
            userFirstName   : '',
            userLastName: '',
            userEmail:'',
            userPassword:'',
            userRoomIds:[],

        }
        this._retrieveData().then();


    }







    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
        //()=>navigate("Second", {})
    }


    _retrieveData = async () => {
        try {




            const userId = await AsyncStorage.getItem('id');
            const userFirstName = await AsyncStorage.getItem('firstName');
            const userLastName = await AsyncStorage.getItem('lastName');
            const userEmail = await AsyncStorage.getItem('email');
            const userPassword = await AsyncStorage.getItem('password');


            this.setState({userId :userId})
            this.setState({userFirstName :userFirstName})
            this.setState({userLastName :userLastName})
            this.setState({userEmail :userEmail})
            this.setState({userPassword :userPassword})
        } catch (error) {
            // Error retrieving data
        }
    };

    saved = () => {

        var {navigate} = this.props.navigation;
        console.log("Begining of saving");


        fetch(Configs.default.ROOM_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },



            body: JSON.stringify({
                name: this.state.roomName,
                temperature: 0,
                visitorStatus: 0,
                lightsOn: 0,
                latitude: 0,
                longitude: 0,
                songPlaying: '',
                parentUser:this.state.userId,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

            })

        Alert.alert(
            'Room Saved',
            'The room has been saved',
            [

                {text: 'OK', onPress: ()=>navigate("Third", {})},
            ],
            {cancelable: false},
        );



    }


    getRooms() {

        //Get user room ids array,
        //iterate through and do n number of get requests
        console.log("POST URL IS  + " + this.userUrl +'/' + this.state.userId);
        return fetch(this.userUrl +'/' + this.state.userId)
            .then((response) => response.json())
            .then((responseJson) => {

                let roomIds = responseJson.roomIds;



                roomIds = roomIds.replace('[', '');
                roomIds = roomIds.replace(']', '');
                console.log("YOUR ROOMS ARE" + roomIds);

                return responseJson.roomIds;
            })
            .catch((error) => {
                console.error(error);
            });
    }








    render() {


        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Room Name"
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(roomName) => this.setState({roomName})}/>
                </View>




                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.saved}>
                    <Text style={styles.loginText}>Add</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    inputContainer: {
        marginTop:20,
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },

    inputs:{

        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop:30,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: '#3D4144',
    },
    loginText: {
        color: 'white',
    },
    minorText:{
        fontSize:16,
        color: '#EE5407'
    }


});