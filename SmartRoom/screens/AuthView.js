import React, { Component } from 'react';
let Configs = require('../config.js');

import UserManager from '../Data Managers/UserManager'
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

export default class AuthView extends Component {

    async checkUserSignedIn(){
        var {navigate} = this.props.navigation;
        try {
            let value = await AsyncStorage.getItem('id');
            if (value != null){
                navigate("Third");
            }
            else {
                navigate("First");
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    render() {
        this.checkUserSignedIn().then();
        return null;
    }
}


