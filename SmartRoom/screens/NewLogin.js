import React, { Component } from 'react';
let Configs = require('../config.js');

import UserManager from './UserManager'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
} from 'react-native';

import {AsyncStorage} from 'react-native'

export default class NewLogin extends Component {

    static navigationOptions = {

        headerStyle: {

            backgroundColor: '#000000'
        },

        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }



    constructor(props) {

        super(props);
        this.state = {
            userId: '',
            firstName:'',
            lastName:'',
            email:'',
            password:'',

        }

    }






    _storeData = async () => {
        try {
            await AsyncStorage.setItem('loggedIn', "true");
            console.log("Saved LOGIN")
        } catch (error) {
            // Error saving data
        }
    };




    _userFound = async () => {
        try {
            await AsyncStorage.setItem('id', this.state.userId);
            await AsyncStorage.setItem('firstName', this.state.firstName);
            await AsyncStorage.setItem('lastName', this.state.lastName);
            await AsyncStorage.setItem('email', this.state.email);
            await AsyncStorage.setItem('password', this.state.password);



        } catch (error) {
            // Error saving data
        }
    };

    verifyUser =  async () => {

    }


    verify = () => {
        var {navigate} = this.props.navigation;
        //console.log(typeof this.loginManager);
        console.log("Email is: " + this.state.email + "\n");
        console.log("Password is: " + this.state.password + "\n");


        /*
        this.verifyUser().then((dummy) => {
        }).catch((error) => {
            console.log('Login Failed with error: ' + error);
            this._retrieveData().then((dummy) => {
            }).catch((error) => {
                console.log('Promise is rejected with error: ' + error);
            });
        });

         */


        fetch(Configs.default.LOGIN_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },



            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,


            }),
        }).then((response) => response.json())

            .then((responseJson) => {

                console.log("Got a response " + responseJson["id"]);



                this.setState({userId: responseJson["id"]});
                this.setState({firstName: responseJson["firstName"]});
                this.setState({lastName: responseJson["lastName"]});
                this.setState({email: responseJson["email"]});
                this.setState({password: responseJson["password"]})
                this._userFound().then((dummy) => {
                    console.log("User logged in");
                    navigate("Third", {});
                }).catch((error) => {
                    console.log('Was not able to save login date' + error);
                });


            }).catch((error) => {
            if (!this.state.userId)  {
                Alert.alert(
                    'Incorrect Email',
                    'It appears that you have entered  an incorrect email or password',
                    [

                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );

            }
                console.log('post request failed with error ' + error);
            });








    }


    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
        //()=>navigate("Second", {})
    }


    getLogin = async () => {
        try {
            const loggedIn = await AsyncStorage.getItem('loggedIn');
            if (loggedIn !== null) {

                if(loggedIn === "true"){
                    var {navigate} = this.props.navigation;
                    // We have data!!
                    //console.log(value);
                    navigate("Third", {})
                }

            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {

        var {navigate} = this.props.navigation;




        this.getLogin().then((dummy) => {
            //this callback is executed when your Promise is resolved



        }).catch((error) => {
            //this callback is executed when your Promise is rejected
            console.log('Promise is rejected with error: ' + error);
        });




        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               autoCapitalize = 'none'
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               autoCapitalize = 'none'
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={
                    this.verify}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text style={styles.minorText}>Forgot your password?</Text>
                </TouchableHighlight>


                <TouchableHighlight style={styles.buttonContainer} onPress={()=> navigate('Second')}>
                    <Text style={styles.minorText}>Register</Text>
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