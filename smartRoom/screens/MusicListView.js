
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    ListView,
    NativeModules,
    FlatList
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import iTunes from 'react-native-itunes';
import MusicList from '../MusicList'

import MusicFiles from 'react-native-get-music-files';
import AudioPlayer from 'react-native-audio-player-recorder';


export default class MusicListView extends React.Component {
    static navigationOptions = {

        headerStyle: {

            backgroundColor: '#000000'
        },
        title:"Songs",


        headerTintColor: '#B9324B',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        },

    }
    constructor() {
        super();
        this.manager = new BleManager();
        this.state = {
            songs:[],
        }

        let btStatus = NativeModules.BluetoothSpeaker.Connect();
        console.log("BT STATUS IS:::::::::" + btStatus)

        AudioPlayer.AudioPlayer.get



        iTunes.getTracks().then((tracks) => {
            this.cleanUpData(tracks)
            this.setState({ songs: tracks })

            //this.tracks = tracks;
        });







        console.log("Initialized Music List View")

    }

    componentWillMount() {

        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.manager.connectedDevices().then((devices) => {
                    console.log("PRINTING...." + devices.length);

                    //console.log("UUIDS:::::::::::" + devices);
                });
                subscription.remove();
            }
        }, true);
    }
    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return
            }

            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            console.log("Device name of::::::::::: " + device.name)
            if (device.name === 'TI BLE Sensor Tag' ||
                device.name === 'SensorTag') {

                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();

                // Proceed with connection.
            }
        });
    }

    cleanUpData(tracks){
        var counter = 0;
        for (var i = 0; i < tracks.length; i++) {
            if(tracks[i].hasOwnProperty('albumTitle')){
                //console.log("Album title exists");
            }else{
                tracks[i].albumTitle = "";
            }


            if(!tracks[i].hasOwnProperty('index')){
                tracks[i].index = counter++;
            }


        }
    }
    render() {
        return (
            <FlatList
                style = {styles.mainView}
                data={this.state.songs}
                renderItem={({item}) =>

                    <TouchableOpacity style={styles.musicListItem} onPress={
                        ()=>iTunes.playTrack(this.state.songs[item.index])

                    }>
                        <Text style = {styles.songNameText}>{item.title}</Text>
                        <Text style = {styles.songAlbumText}>{item.albumTitle}</Text>
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
    musicListItem:{

        marginBottom: 5,

        marginLeft:4,
        marginRight:4,
        height:80,
        backgroundColor:'#3D4144'
    },


    songNameText:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,

        fontSize: 22,
        textAlign: 'right',
        color: '#E8EFE5',
    },

    songAlbumText:{
        marginTop:8,
        marginLeft:10,
        marginRight:10,

        fontSize: 14,
        textAlign: 'right',
        color: '#E8EFE5',
    },

});