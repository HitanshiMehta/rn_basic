import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import Auth from './Auth';

const firebaseConfig = {
    apiKey: "AIzaSyBtPbcZWSKYGHd1bYw4QldL2AYE7WREa44",
    authDomain: "react-firebase-1dbff.firebaseapp.com",
    databaseURL: "https://react-firebase-1dbff.firebaseio.com",
    projectId: "react-firebase-1dbff",
    storageBucket: "react-firebase-1dbff.appspot.com",
}

firebase.initializeApp(firebaseConfig)

const ContainerScreen = () => {
    return (
        <Auth />
    );
}

export default ContainerScreen;

const styles = StyleSheet.create({
    screen: {

    }
});