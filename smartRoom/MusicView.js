
import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";

import Slider from "react-native-slider";



const albuMlength = (Dimensions.get('window').width) - 40;
const pausePlaySize = 60;
export default class App extends React.Component {

    static navigationOptions = {
        title: 'Music',
        headerStyle: {
            backgroundColor: '#000000'
        },

        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },
        headerTintColor:'#B9324B'


    }
    state = {
        value: 0.2
    };




    render() {
        const {value} = this.state;
        return (
            <View style = {styles.outerView}>
                <View style={styles.mainView}>
                    <Text style={fontStyles.Songname}>
                        Under The Bridge
                    </Text>
                    <Text style={fontStyles.artistName}>
                        Red Hot Chili Peppers
                    </Text>
                    <Image
                        style = {styles.albumArt}
                        source={require('./BSSM.jpg')}
                    />


                </View>

                <View style = {styles.sliderMargins}>
                    <Slider

                        thumbTintColor = {"#B9324B"}
                        maximumValue={10}
                        maximumTrackTintColor = {"#3D4144"}
                        minimumTrackTintColor = {"#DEE5D6"}
                        value={this.state.value}
                        onValueChange={value => this.setState({ value })}
                    />

                </View>





                <View style = {styles.buttonRow}>

                    <TouchableOpacity style={styles.backButton}>
                        <Image


                            source={require('./backButton.png')}
                        />
                    </TouchableOpacity>




                    <TouchableOpacity style={styles.playPause}>
                        <Image


                            source={require('./pause.png')}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.nextButton}>

                        <Image

                            style={styles.pauseImage}
                            source={require('./forwardButton.png')}
                        />

                    </TouchableOpacity>




                </View>
            </View>

        );
    }
}



const fontStyles = StyleSheet.create({

    Songname:{
        marginTop: 20,
        fontSize: 38,
        textAlign: 'center',
        color: '#DEE5D6',
    },

    artistName:{
        marginTop: 5,
        marginBottom: 10,
        fontSize: 24,
        textAlign: 'center',
        color: '#DEE5D6',
    }

});

const styles = StyleSheet.create({
    outerView:{
        height:(Dimensions.get('window').height),
        width:(Dimensions.get('window').width),
        backgroundColor: '#000000',
    },
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },

    albumArt:{
        borderRadius: 15,
        width: albuMlength,
        height: albuMlength,
    },

    sliderMargins: {
        marginTop:20,
        backgroundColor:'#000000',
        marginLeft: 20,
        marginRight: 20,
    },
    buttonRow:{

        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#000000',
        backgroundColor: '#000000',

    },
    playPause:{
        height:pausePlaySize + 20,
        width: pausePlaySize + 20,
        justifyContent: 'center',
        alignItems: 'center',

    },

    backButton:{
        marginTop:10,
        marginLeft: 30,
        height:pausePlaySize,
        width: pausePlaySize,

    },
    nextButton:{

        marginTop:10,
        marginRight:30,
        height:pausePlaySize,
        width: pausePlaySize,

    },
    pauseImage:{
        justifyContent: 'center',
        alignItems: 'center',
    }




});