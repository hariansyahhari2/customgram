//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Fire from '../Fire'

// create a component
class ProfileScreen extends Component {
    state={
        user: {}
    }

    unsubscribe = null

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc => {
            this.setState({ user: doc.data() })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 64, alignItems: 'center'}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/tempAvatar.jpg')}/>
                    </View>
                    <View>
                        <Text style={styles.name} >
                            {this.state.user.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>10k</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>0</Text>
                        <Text style={styles.statTitle}>Following</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {Fire.shared.signOut()}}
                    style={styles.signOut}
                >
                    <Text style={{alignSelf: 'center', color: 'white',fontSize: 20, fontWeight: 'bold'}}>Log Out</Text>
                </TouchableOpacity>
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
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 136/2,
        borderWidth: 5,
        borderColor: '#F08519'
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: 'bold'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 32
    },
    stat: {
        alignItems: 'center',
        flex: 1
    },
    statAmount: {
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300'
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4
    },
    signOut: {
        justifyContent: 'center', 
        alignSelf: 'center', 
        height: 30, 
        width: 100, 
        backgroundColor: '#F08519', 
        borderRadius: 15
    }
});

//make this component available to the app
export default ProfileScreen;
