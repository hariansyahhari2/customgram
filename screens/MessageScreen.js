//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class MessageScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Message Screen</Text>
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
        backgroundColor: '#EFECF4'
    },
});

//make this component available to the app
export default MessageScreen;
