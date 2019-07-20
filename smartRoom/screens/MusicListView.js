
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
    FlatList,
    Button,
    Image
} from 'react-native';
import iTunes from 'react-native-itunes';

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
        this.state = {
            songs:[],
            isPlaying:false,
            visibleModalId: null,
            currentSongName:'',
            currentSong:null,
            albumArt:null,

        };


        this.getCurrentSong();

        iTunes.getTracks().then((tracks) => {
            this.cleanUpData(tracks)
            this.setState({ songs: tracks })
            this.setState({ albumArt: track.artwork});

        });
        console.log("Initialized Music List View")
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

    playSong = (roomId, song) => {



        this.setState({ isPlaying: true });
        this.setState({ currentSongName: song.title });
        iTunes.playTrack(song);
        NativeModules.BluetoothSpeaker.updateRoom(song.title, roomId);
        this.updateSong().then();
        this.getCurrentSong();
    };

    async updateSong(){
        iTunes.getCurrentTrack().then(track => {
            if(track){
                this.setState({ albumArt: track.artwork});
            }

        });

    }

    NavigateToScreen(){
        var {navigate} = this.props.navigation;

            navigate("Music", {
                songs: this.state.songs,
                currentSong: this.state.currentSong
            })


    }

    getCurrentSong(){
        iTunes.getCurrentTrack().then(track => {
            if(track){
                this.setState({ isPlaying: true });
                this.setState({ currentSongName: track.title });
                this.setState({ currentSong: track});
            }
        });
    }

    render() {
        const { navigation } = this.props;
        const roomId = navigation.getParam('roomId', '');
        return (
            <View style = {styles.container}>

                <FlatList
                    style = {styles.mainView}
                    data={this.state.songs}
                    renderItem={({item}) =>

                        <TouchableOpacity style={styles.musicListItem} onPress={
                            ()=>this.playSong(roomId, this.state.songs[item.index])

                        }>
                            <Text style = {styles.songNameText}>{item.title}</Text>
                            <Text style = {styles.songAlbumText}>{item.albumTitle}</Text>
                        </TouchableOpacity>




                    }
                    keyExtractor={(item, index) => index.toString()}

                />

                {renderIf(this.state.isPlaying,

                    <TouchableOpacity style = {styles.musicPopup} onPress={
                        ()=>this.NavigateToScreen()}>
                        {renderIf(this.state.albumArt,
                        <Image
                            style={styles.albumArtModal}
                            source={{
                                uri: this.state.albumArt}}
                        />
                        )}


                        {renderIf(!this.state.albumArt,
                            <Image
                                style={styles.albumArtModal}
                                source={require('../music-icon.png')}
                            />
                        )}


                        <Text  numberOfLines={1} style={styles.songNameModalText}>
                            {this.state.currentSongName}
                        </Text>

                    </TouchableOpacity>
                )}


            </View>


        );
    }



    renderModalContent = () => (
        <View style={[styles.modalContent]}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            <Button
                onPress={() => this.setState({ visibleModal: null })}
                title="Close"
            />
        </View>
    );





}


const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
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

        fontSize: 15,
        textAlign: 'right',
        color: '#E8EFE5',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,

    },contentTitle: {
        fontSize: 20,
        marginBottom: 12,

    }, modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }, musicPopup:{
        flexDirection: 'row',
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        height:80,
        color: '#000000',
    },
    songNameModalText:{
        marginTop:20,
        marginLeft:20,
        marginRight:12,
        textAlign: 'left',
        color: '#B9324B',
        fontSize: 21,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    albumArtModal: {
        height:55,
        width:55,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    }


});

function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}