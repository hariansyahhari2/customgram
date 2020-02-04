import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabsNavigator, createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'

import MessageScreen from './screens/MessageScreen'
import ProfileScreen from './screens/ProfileScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBX2_ntQCp-wzldI_ETFjEJ_VLXQDKtVyM",
  authDomain: "customgram-93d8b.firebaseapp.com",
  databaseURL: "https://customgram-93d8b.firebaseio.com",
  projectId: "customgram-93d8b",
  storageBucket: "customgram-93d8b.appspot.com",
  messagingSenderId: "102155200883",
  appId: "1:102155200883:web:218ad5f4d4905552f73d06"
};
// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); 
}

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons name="ios-home" size={30} color={tintColor} />
            )
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons name="ios-chatboxes" size={30} color={tintColor} />
            )
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons 
                name="ios-add-circle" 
                size={50} 
                color="#F08519"
                style={{
                  shadowColor: '#F08519',
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowRadius: 10,
                  shadowOpacity: 0.9,
                }}
              />
            )
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons name="ios-heart-empty" size={30} color={tintColor} />
            )
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons name="ios-person" size={30} color={tintColor} />
            )
          }
        }
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key == 'Post') {
              navigation.navigate('postModal')
            }
            else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          style: {height: 50},
          activeTintColor: '#161F3D',
          inactiveTintColor: '#B8BBC4',
          showLabel: false
        },
        initialRouteName: 'Profile'
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
  )
)

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};