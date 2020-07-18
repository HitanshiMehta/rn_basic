import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Dimensions,
    Animated,
    Easing,
    Keyboard,
    StyleSheet
} from 'react-native'
import LoginForm from './LoginForm';

import * as firebase from 'firebase'
import LoginImage from './LoginImage';
import LoginButton from './LoginButton';

const { height } = Dimensions.get('window')
const halfHeight = height / 2

const LoginScreen = () => {
    const signInAnim = useRef(new Animated.Value(1)).current
    const bgAnim = useRef(new Animated.Value(0)).current

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [bgY, setBgY] = useState(0)
    const [isItSignUp, setIsItSignUp] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                console.log("show", signInAnim, "signInAnim")
                setKeyboardVisible(true);
                const keybordHeight = e.endCoordinates.height
                Animated.timing(
                    bgAnim,
                    {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.elastic(),
                        useNativeDriver: false
                    }
                ).start();
                // This animation will work when keybord is shown/hidden
                // 1. When keyboard is shown (bgAnim :0->1)->(bgY: height to keybord + Height)
                // 2. when keybord is hidden (bgAnim: 1->0)->(bgY: keybord + Height to height)
                // if (signInAnim !== 1) {
                // console.log("Enter")
                setBgY(
                    bgAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-halfHeight, -halfHeight - keybordHeight]
                    })
                )
                // }

            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                console.log("hide")
                setKeyboardVisible(false);
                Animated.timing(
                    bgAnim,
                    {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.elastic(),
                        useNativeDriver: false
                    }
                ).start();
            }
        );

        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                console.log(user)
            }
        })

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // As sign in button hide(opacity: 1 -> 0)
    // we are transforming button(buttonY)
    // Showing Form(formZIndex)
    // Increasing form opacity and transforming
    // And also rotateCross
    const onSignInPress = props => {
        if (props === "SignUp") {
            setIsItSignUp(true)
        }
        Animated.timing(
            signInAnim,
            {
                toValue: 0,
                duration: 1500,
                easing: Easing.elastic(),
                useNativeDriver: false
            }
        ).start();
        // In case if keybord is not shown
        setBgY(
            signInAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-halfHeight, 0]
            })
        )
    }

    return (
        <View style={styles.screen}>
            <LoginImage
                bgY={bgY}
            />
            <LoginButton
                signInAnim={signInAnim}
                onSignInPress={onSignInPress}
            />
            <LoginForm
                signInAnim={signInAnim}
                setBgY={setBgY}
                isKeyboardVisible={isKeyboardVisible}
                setKeyboardVisible={setKeyboardVisible}
                isItSignUp={isItSignUp}
            />
        </View >
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});