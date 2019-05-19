
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,WebView,Dimensions, TouchableOpacity, ScrollView,Alert, ListView} from 'react-native';

import MusicList from '../MusicList'
class Song {
    constructor() {
        this.title = 'Under The Bridge';
        this.artist = 'Red Hot Chili peppers';
        this.albumArtURL = './BSSM.jpg';
    }
}

export default class MusicListView extends React.Component {


    render() {
        return (
            <View >

            </View>




        );
    }

    getData() {
        return [
            {
                key: '1', title: 'Albert Einstein',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png'
            },
            {
                key: '2',
                title: 'Isaac newton',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
            },

        ]
    }
}