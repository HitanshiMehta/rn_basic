import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

import Colors from '../../constants/review/Colors'
import LoginForm from './LoginForm';
import FlatButton from '../../shared/common/FlatButton';

import * as firebase from 'firebase'

const { width, height } = Dimensions.get('window')
const rHeight = height / 10
const halfHeight = height / 2

const LoginScreen = () => {
    const buttonAnim = useRef(new Animated.Value(1)).current
    const bgAnim = useRef(new Animated.Value(0)).current

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [bgY, setBgY] = useState(0)

    useEffect(() => {
        console.log(buttonAnim, "animation re")
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardVisible(true);
                const keybordHeight = e.endCoordinates.height
                Animated.timing(
                    bgAnim,
                    {
                        toValue: 1,
                        duration: 1,
                        easing: Easing.elastic(),
                        useNativeDriver: false
                    }
                ).start();
                // This animation will work when keybord is shown/hidden
                // 1. When keyboard is shown (bgAnim :0->1)->(bgY: height to keybord + Height)
                // 2. when keybord is hidden (bgAnim: 1->0)->(bgY: keybord + Height to height)
                if (buttonAnim !== 1) {
                    setBgY(
                        bgAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-halfHeight, -halfHeight - keybordHeight]
                        })
                    )
                }

            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                setKeyboardVisible(false);
                Animated.timing(
                    bgAnim,
                    {
                        toValue: 0,
                        duration: 1,
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
    //****(In LoginForm component) *****//
    // Showing Form(formZIndex)
    // Increasing form opacity and transforming
    // And also rotateCross
    const onSignInPress = () => {
        Animated.timing(
            buttonAnim,
            {
                toValue: 0,
                duration: 1000,
                easing: Easing.elastic(),
                useNativeDriver: false
            }
        ).start();
        // In case if keybord is not shown
        setBgY(
            buttonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-halfHeight, 0]
            })
        )
    }

    const buttonY = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    })

    const formZIndex = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, -1],
    });

    const formOpacity = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const formTransform = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    const loginWithFacebook = async () => {
        console.log("Hello")
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '596708957716033', { persmissions: ['public_profile'] }
        )
        if (type === "suceess") {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInWithCredential(credentials).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <View style={styles.screen}>
            <Animated.View
                style={[
                    styles.imageContainer,
                    { transform: [{ translateY: bgY }] }
                ]}
            >
                <Svg
                    height={height + rHeight}
                    width={width}
                >
                    <ClipPath id="clip">
                        <Circle
                            cx={width / 2}
                            r={height + rHeight}
                        />
                    </ClipPath>
                    <Image
                        href={require('../../assets/Images/login/bg.jpg')}
                        height={height + rHeight}
                        width={width}
                        preserveAspectRatio='xMidYMid slice'
                        clipPath='url(#clip)'
                    />
                </Svg>
            </Animated.View>
            <Animated.View style={[
                styles.imageButtonView,
                {
                    opacity: buttonAnim,
                    transform: [{ translateY: buttonY }]
                }
            ]}>
                <TapGestureHandler onHandlerStateChange={onSignInPress}>
                    <Animated.View style={styles.imageSignInContainer}>
                        <Text style={styles.imageSignInText}>Sign in</Text>
                    </Animated.View>
                </TapGestureHandler>
                <TapGestureHandler onHandlerStateChange={loginWithFacebook}>
                    <Animated.View style={{
                        ...styles.imageSignInContainer,
                        backgroundColor: "#3B5998",
                    }}
                    >
                        <Text style={{
                            ...styles.imageSignInText,
                            color: "white"
                        }}
                        >SignIn with Facebook</Text>
                    </Animated.View>
                </TapGestureHandler>
            </Animated.View>
            <Animated.View style={[
                styles.singIn,
                {
                    zIndex: formZIndex,
                    opacity: formOpacity,
                    transform: [{ translateY: formTransform }]
                }
            ]}>
                <LoginForm
                    buttonAnim={buttonAnim}
                    setBgY={setBgY}
                    isKeyboardVisible={isKeyboardVisible}
                    setKeyboardVisible={setKeyboardVisible}
                />
            </Animated.View>

            {/* <View > */}
            {/* {buttonAnim.map(anim => {
                    <Text>{anim}</Text>
                })} */}
            {/* <Text style={{ fontSize: 40, color: "white" }}>{JSON.stringify(buttonAnim)}</Text>
            </View> */}
        </View >
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    imageContainer: {
        ...StyleSheet.absoluteFill,
    },
    image: {
        height: height,
        width: width,
        flex: 1
    },
    imageButtonView: {
        top: -40,
        justifyContent: "center"
    },
    imageSignInContainer: {
        margin: 10,
        backgroundColor: Colors.white,
        marginHorizontal: 40,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10
    },
    imageSignInText: {
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.darkPurple,
        fontSize: 24
    }
});