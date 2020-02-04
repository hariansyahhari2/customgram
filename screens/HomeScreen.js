//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import * as firebase from 'firebase'

// still using temporary data
var posts = posts = [
    {
        id: "1",
        name: "Hariansyah",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage1.jpg")
    },
    {
        id: "2",
        name: "Hariansyah",
        text:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage2.jpg")
    },
    {
        id: "3",
        name: "Hariansyah",
        text:
            "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage3.jpg")
    },
    {
        id: "4",
        name: "Hariansyah",
        text:
            "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage4.jpg")
    }
];

// create a component
class HomeScreen extends Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image 
                    source={post.avatar}
                    style={styles.avatar}
                />
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons
                            name='ios-more'
                            size={24}
                            color='#73788B'
                        ></Ionicons>
                    </View>
                    <Image
                        source={post.image}
                        style={styles.postImage}
                        resizeMode= 'cover'
                    />
                    <Text style={styles.posts}>{post.text}</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Ionicons
                            name='ios-heart-empty'
                            size={24}
                            color='#73788B'
                            style={{marginRight: 16}}
                        />
                        <Ionicons
                            name='ios-chatboxes'
                            size={24}
                            color='#73788B'
                            style={{marginRight: 16}}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList 
                    style={styles.feed}
                    data={posts}
                    renderItem={({item}) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator= {false}
                >

                </FlatList>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        paddingTop: 40,
        paddingBottom: 16, 
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    feed: {
    },
    feedItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65'
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});

//make this component available to the app
export default HomeScreen;
