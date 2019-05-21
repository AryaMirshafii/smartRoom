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

export default class Register extends Component {
    static navigationOptions = {

        headerStyle: {

            backgroundColor: '#000000'
        },
        title:"Register",


        headerTintColor: '#B9324B',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }
    constructor(props) {
        super(props);
        this.postUrl = 'https://sgje19f2bj.execute-api.us-east-1.amazonaws.com/dev/users';
        this.state = {
            firstName   : '',
            lastName: '',
            email:'',
            password1:'',
            password2:'',
        }
    }





    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
        //()=>navigate("Second", {})
    }


    registered = () => {
        var {navigate} = this.props.navigation;
        console.log("Begining of registered");
        if(this.state.password1 !== this.state.password2){
            console.log("YOUR PASSWORDS DO NOT MATCH........");
            Alert.alert(
                'Passwords Do not Match',
                'Your passwords do not match',
                [

                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }else{

            this._storeData().then((dummy) => {
                //this callback is executed when your Promise is resolved

                console.log("POSTING DATA..............");






                fetch(this.postUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password1,
                        roomIds:'',
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        return responseJson.movies;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                console.log("POSTED DATA................")


            }).catch((error) => {
                //this callback is executed when your Promise is rejected
                console.log('Promise is rejected with error: ' + error);
            });



            console.log("YOUR PASSWORDS DO MATCH........");

            console.log("PRe going to 3rd");

            navigate("Third", {});
        }

    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('firstName', this.state.firstName);
            await AsyncStorage.setItem('lastName', this.state.lastName);
            await AsyncStorage.setItem('email', this.state.email);
            await AsyncStorage.setItem('password', this.state.password1);



        } catch (error) {
            // Error saving data
        }
    };
    

    render() {


        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="First Name"
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(firstName) => this.setState({firstName})}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Last Name"
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(lastName) => this.setState({lastName})}/>
                </View>



                <View style={styles.inputContainer}>

                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               autoCapitalize = 'none'
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>


                <View style={styles.inputContainer}>

                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               keyboardType="email-address"
                               secureTextEntry={true}
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(password1) => this.setState({password1})}/>
                </View>



                <View style={styles.inputContainer}>

                    <TextInput style={styles.inputs}
                               placeholder="Re-Enter Your Password"
                               keyboardType="email-address"
                               secureTextEntry={true}
                               autoCapitalize = 'none'
                               underlineColorAndroid='transparent'
                               onChangeText={(password2) => this.setState({password2})}/>
                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.registered}>
                    <Text style={styles.loginText}>Login</Text>
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
        marginTop:50,
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