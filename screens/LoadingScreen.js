//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import firebase from 'firebase'
import Fire from '../Fire'

// create a component
class LoadingScreen extends Component {
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 50 }} />
                <Image source={require("../assets/Customgram.png")} style={{alignSelf: 'center' ,height: 60, width: 300}}></Image>
                <Text style={styles.loadingText}></Text>
                <View style={{justifyContent: 'flex-end', marginVertical: 50}}>
                    <Text style={styles.footer}>{'Portfolio created by:\n'}<Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 15, color: '#F08519'}}>Hariansyah</Text></Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
            marginTop: 32,
            fontSize: 18,
            fontWeight: '400',
            textAlign: 'center'

    },
    footer: {
        fontSize: 20, 
        marginTop: 32, 
        fontSize: 18, 
        fontWeight: '400', 
        textAlign: 'center',
    }
});

//make this component available to the app
export default LoadingScreen;
