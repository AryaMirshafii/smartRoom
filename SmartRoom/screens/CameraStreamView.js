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


const cameraStreamUrl = 'http://10.2.53.84:81/stream';
export default class CameraStreamView extends React.Component {


    static navigationOptions = {

        headerStyle: {

            backgroundColor: '#000000'
        },
        title:"Camera View",


        headerTintColor: '#B9324B',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 27,
            color: '#B9324B'
        }

    }

    state: any;
    constructor() {

         super();
         this.state = {
            key: 0
         };



    }

    refreshStream(){
        console.log("Refreshing...")
        this.setState({ key: this.state.key + 1 });
        //this.webView.ref.reload();
    }

    render() {
        let WebViewRef;
        return (
            <View style={styles.container}>
                <WebView
                    key={this.state.key}

                    source={{uri: cameraStreamUrl}}
                    style= {styles.camWebView}
                />

                <View style={styles.container2}>
                    <View style={styles.refreshButton}>
                        <TouchableOpacity style={styles.refreshButton} onPress={(e) => this.refreshStream(e)}>

                            <Text style={styles.buttonText}>
                                Reload
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }

}
//

const styles = StyleSheet.create({



    mainView: {


        //backgroundColor: '#000000',
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',

    },
    camWebView: {
        height:200,

        marginTop: 30,
        marginBottom: 20,
        backgroundColor:'transparent'

    },
    refreshButton:{
        marginTop:10,
        marginBottom: 10,
        height:60,
        width:150,
        backgroundColor:'#3D4144',
        borderRadius:10,
    },
    buttonText:{
        color: '#E8EFE5',
        fontSize: 35,
        textAlign: 'center',
    },
    container2:{
        marginTop:20,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});