//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'

// create a component
class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    state= {
        user: {
            name: "",
            email: "",
            avatar: null,
            password: "",
        },
        errorMessage: null
    }

    handlePickAvatar = async() => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1]
        })

        if (!result.cancelled){
            this.setState({user: {...this.state.user, avatar: result.uri}})
        }
    }

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user)
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <ScrollView>
                <StatusBar barStyle="light-content"></StatusBar>
                    <TouchableOpacity 
                        style={styles.back}
                        onPress = {() => this.props.navigation.navigate("Login")}
                    >
                        <Ionicons name="ios-arrow-round-back" size={25} color="#FFF" ></Ionicons>
                    </TouchableOpacity>
                    <Image source={require("../assets/Customgram.png")} style={{ alignSelf: 'center' ,height: 40, width: 200, marginTop: 75}}></Image>
                    <Text style={styles.greeting}>
                        {'Sign up to Customgram'}
                    </Text>
                    
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                            <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                            <Ionicons
                                name='ios-add' 
                                size={40}
                                color='#FFF'
                            />
                        </TouchableOpacity>
                        <Text style={{marginTop: 5, fontSize: 15}}>Set Profile Photo</Text>
                    </View>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <TextInput
                                style={styles.input, {textTransform: 'capitalize'}}
                                autoCapitalize='none'
                                onChangeText={name => this.setState({ user: {...this.state.user, name} })}
                                value={this.state.user.name}
                                placeholder='Full Name'
                                returnKeyType = { "next" }
                            />
                        </View>

                        <View style={{marginTop: 32}}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={email => this.setState({user: {...this.state.user, email}})}
                                value={this.state.user.email}
                                placeholder='Email Address'
                            />
                        </View>

                        <View style={{marginTop: 32}}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={password => this.setState({user: {...this.state.user, password}})}
                                value={this.state.user.password}
                                placeholder='Password'
                                onSubmitEditing={this.handleSignUp}
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.handleSignUp}
                    >
                        <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{marginTop: 32, alignSelf: 'center'}}
                        onPress={() => this.props.navigation.navigate("Login")}
                    >
                        <Text style={{color: '#414959'}}>{'Already have account?\n'}</Text>
                        <Text style={{fontWeight: '500', color: '#F08519', alignSelf: 'center'}}>Log In</Text>
                    </TouchableOpacity>
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
            marginTop: 20,
            fontSize: 18,
            fontWeight: '900',
            alignSelf: 'center',
            top: 10

    },
    errorMessage: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
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
        color: '#161F3D',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#F08519',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    back: {
        position: 'absolute',
        top: 45,
        left: 20,
        width: 32,
        height: 32,
        borderRadius: 25,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#E1E2E6',
        borderRadius: 50,
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 100,
    }
});

//make this component available to the app
export default LoginScreen;
