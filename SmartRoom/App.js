/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  AsyncStorage
} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import iTunes from 'react-native-itunes';

import RoomView from "./RoomView";
import MusicView from "./MusicView";
import MusicListView from "./screens/MusicListView";

import NewLogin from "./screens/NewLogin"
import Register from "./screens/Register"
import RoomList from "./screens/RoomList"

import AddRoomScreen from "./screens/AddRoomScreen"

import CameraStreamView from "./screens/CameraStreamView"
import AuthView from "./screens/AuthView"


async function getUserName(){
    return await AsyncStorage.getItem('id');

}





var Navigation =  createStackNavigator(
    {
        Auth:{screen: AuthView},
      First: {screen: NewLogin},
      Second: {screen: Register},
      Third: {screen: RoomList},
      Fourth: {screen: RoomView},
      Fifth: {screen: MusicListView},
      AddRoom:{screen: AddRoomScreen},
      CameraView:{screen: CameraStreamView},

    });
export default createAppContainer(Navigation);


