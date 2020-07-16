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

const Test = () => {
    const buttonAnim = useRef(new Animated.Value(1)).current
    const bgAnim = useRef(new Animated.Value(0)).current

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [bgY, setBgY] = useState(0)

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

    loginWithFacebook = async () => {
        const { type, token } = await Expo.Facebook.loginWithReadPermissionsAsync(
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
                {/* <Svg
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
                </Svg> */}
            </Animated.View>
            <Animated.View style={[
                styles.imageButtonView,
                {
                    height:halfHeight,
                    opacity: buttonAnim,
                    transform: [{ translateY: buttonY }]
                }
            ]}>
                <TapGestureHandler onHandlerStateChange={onSignInPress}>
                    <Animated.View style={styles.imageSignInContainer}>
                        <Text style={styles.imageSignInText}>Sign in</Text>
                    </Animated.View>
                </TapGestureHandler>
                <FlatButton
                    text="Signin with Facebook"
                    buttonContainer={
                        {
                            ...styles.imageSignInContainer,
                            backgroundColor: "#3B5998",
                        }
                    }
                    buttonText={{
                        ...styles.imageSignInText,
                        color: "white"
                    }}
                    onPress={loginWithFacebook}
                />
            </Animated.View>
            {/* <LoginForm
                buttonAnim={buttonAnim}
                setBgY={setBgY}
                isKeyboardVisible={isKeyboardVisible}
                setKeyboardVisible={setKeyboardVisible}
            /> */}
        </View>
    );
}

export default Test;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end'
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