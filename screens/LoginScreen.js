//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView,ScrollView, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native';

import * as firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';


// create a component
class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    state= {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = ()  => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <ScrollView>
                <StatusBar barStyle="light-content"></StatusBar>
                    <View style={{ marginTop: 100 }} />
                    <Image source={require("../assets/Customgram.png")} style={{alignSelf: 'center' ,height: 60, width: 300}}></Image>
                    <Text style={styles.greeting}>
                        {'Login to your account'}
                    </Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    
                    <View style={styles.form}>
                        <View>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}
                                placeholder='Email Address'
                            />
                        </View>

                        <View style={{marginTop: 32}}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={password => this.setState({password})}
                                value={this.state.password}
                                placeholder='Password'
                                onSubmitEditing={this.handleLogin}
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={{color: '#FFF', fontWeight: '500'}}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{marginTop: 32, alignSelf: 'center'}}
                        onPress={() => this.props.navigation.navigate("Register")}
                    >
                        <Text style={{color: '#414959'}}>{'New to Customgram?\n'}</Text>
                        <Text style={{fontWeight: '500', color: '#F08519', alignSelf: 'center'}}>Sign Up</Text>
                    </TouchableOpacity>

                    <Text style={styles.footer}></Text>
                    <View style={{justifyContent: 'flex-end', marginVertical: 40}}>
                        <Text style={styles.footer}>{'Portfolio created by:\n'}<Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 15, color: '#F08519'}}>Hariansyah</Text></Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
            marginTop: 32,
            fontSize: 18,
            fontWeight: '400',
            textAlign: 'center'

    },
    errorMessage: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        height: 40,
        borderBottomColor: '#848F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#F08519',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
            marginTop: 32,
            fontSize: 18,
            fontWeight: '400',
            textAlign: 'center'

    },
});

//make this component available to the app
export default LoginScreen;
