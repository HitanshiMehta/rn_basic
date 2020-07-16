import React, { Component, useState } from 'react';
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'


import LoginScreen from './LoginScreen';

import * as firebase from 'firebase'
import Test from './Test';
const firebaseConfig = {
    apiKey: "AIzaSyBtPbcZWSKYGHd1bYw4QldL2AYE7WREa44",
    authDomain: "react-firebase-1dbff.firebaseapp.com",
    databaseURL: "https://react-firebase-1dbff.firebaseio.com",
    projectId: "react-firebase-1dbff",
    storageBucket: "react-firebase-1dbff.appspot.com",
}

firebase.initializeApp(firebaseConfig)

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require('../../assets/Images/login/bg.jpg')]);
    await Promise.all([...imageAssets]);
}

const ContainerScreen = () => {
    const [isReady, setIsReady] = useState(false)
    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadAssetsAsync}
                onFinish={setIsReady(true)}
                onError={console.warn}
            />
        );
    }
    return (
        <LoginScreen />
        // <Test />
    )
}

export default ContainerScreen;

