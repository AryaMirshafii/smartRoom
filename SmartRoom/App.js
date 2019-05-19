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


import RoomView from "./RoomView";
import MusicView from "./MusicView";
import MusicListView from "./screens/MusicListView";

import Login from "./screens/Login"
import Register from "./screens/Register"
import RoomList from "./screens/RoomList"





var Navigation = createStackNavigator(
    {
  First: {screen: Login},
  Second: {screen: Register},
  Third: {screen: RoomList},
  Fourth: {screen: RoomView},
  Fifth: {screen: MusicListView},

});





export default createAppContainer(Navigation);
