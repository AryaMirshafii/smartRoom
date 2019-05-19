import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MusicListCell from './MusicListCell';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const MusicList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <MusicListCell
                title={item.title}
                description={item.description}
                image_url={item.image_url}
            />}
        />

    </View>
);

export default MusicList;