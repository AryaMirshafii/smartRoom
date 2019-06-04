import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,WebView,Dimensions, TouchableOpacity, ScrollView,Alert} from 'react-native';



const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const outerCircleDim = 250;
const innerCircleDim = 240;
const edgeMargin = 20;
const squareSide = (Dimensions.get('window').width)/2 - 40;
type Props = {};



export default class RoomView extends React.Component {

    static navigationOptions = {
        title: 'Room Info',
        headerStyle: {
            backgroundColor: '#000000'
        },
        headerTintColor:'#B9324B',

        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }
    musicButtonPressed(){

    }


    lightButtonPressed(){
        Alert.alert('You tapped the light button!')
    }


    fanButtonPressed(){
        Alert.alert('You tapped the fan button!')
    }

    render() {
        //this.props.navigation
        var {navigate} = this.props.navigation;
        const { navigation } = this.props;
        const roomName = navigation.getParam('roomName', 'Room Info');


        return (
            <ScrollView style={styles.mainView}>


                <View style={styles.mainView}>




                    <View style={styles.container}>

                        <View style={styles.outerCircle}>
                            <View style={styles.innerCircle}>

                            </View>
                        </View>
                    </View>
                    <Text style={styles.tempF}>
                        <Text style={styles.leftTemperature}>72</Text>
                        <Text style={styles.degreeF}> °F</Text>


                    </Text>


                    <Text style={styles.humidity}>
                        <Text style={styles.rightHumidity}>0.1</Text>
                        <Text style={styles.gm3}>g/m3</Text>
                    </Text>




                </View>
                <View contentContainerStyle = {buttonStyles.buttonRow}>


                    <View style={buttonStyles.buttonColumn}>

                        <View style={buttonStyles.buttonRow}>
                            <TouchableOpacity style={buttonStyles.leftButton} onPress={
                                ()=>navigate("Fifth", {})



                            }>
                                <Text style={buttonStyles.buttonText}>
                                    Music
                                </Text>


                            </TouchableOpacity>



                            <TouchableOpacity style={buttonStyles.rightButton} onPress={this.lightButtonPressed}>
                                <Text style={buttonStyles.buttonText}>
                                    Light
                                </Text>



                            </TouchableOpacity>

                        </View>


                        <View style={buttonStyles.buttonRow}>

                            <TouchableOpacity style={buttonStyles.leftButton} onPress={this.fanButtonPressed}>
                                <Text style={buttonStyles.buttonText}>
                                    Fan
                                </Text>
                            </TouchableOpacity>



                            <TouchableOpacity style={buttonStyles.rightButton}>
                                <Text style={buttonStyles.buttonText}>
                                    Party
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>







                </View>







            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({

    mainView: {


        backgroundColor: '#000000',
    },
    container: {

        flex: 1,

        alignItems: 'center',
        backgroundColor: '#000000',
    },
    outerCircle: {
        marginTop:20,
        width: outerCircleDim,
        height: outerCircleDim,
        borderRadius: outerCircleDim/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B9324B'

    },
    innerCircle: {
        width: innerCircleDim,
        height: innerCircleDim,
        borderRadius: innerCircleDim/2,
        backgroundColor: '#000000'
    },
    instructions: {
        fontSize: 50,
        textAlign: 'center',
        color: '#DEE5D6',
        marginBottom: 5,
    },
    leftTemperature: {


        fontSize: 70,
        textAlign: 'left',
        color: '#E8EFE5',

        marginLeft: 20
    },
    degreeF: {

        fontSize: 30,
        //textAlign: 'left',
        color: '#E8EFE5',

        marginLeft: 5
    },
    tempF: {

        marginLeft:edgeMargin,
        left: 0,
        marginTop:-50,
        //flexDirection: "row"
        justifyContent: 'space-between'
    },
    humidity:{
        position: 'absolute',

        marginTop:250,
        //flexDirection: "row"
        right: 0,
        marginRight:edgeMargin
    },
    rightHumidity: {


        fontSize: 40,
        textAlign: 'right',
        color: '#E8EFE5',


    },
    gm3:{
        fontSize: 20,
        //textAlign: 'left',
        color: '#E8EFE5',
        textAlign: 'right',
        marginLeft: 100
    },
    webview:{
        width: innerCircleDim,
        height: innerCircleDim,
        borderRadius: innerCircleDim/2,
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
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