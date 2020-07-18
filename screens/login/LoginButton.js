import React from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Colors from '../../constants/review/Colors'

const LoginButton = props => {
    const { signInAnim, onSignInPress } = props

    const buttonY = signInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    })

    const loginWithFacebook = async () => {
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
    const clickMe = () => {
        console.log("Clicked me!")
    }


    return (
        <>
            <View style={styles.imageButtonView}>
                <Animated.View style={
                    // [
                    // styles.imageButtonView,
                    {
                        opacity: signInAnim,
                        transform: [{ translateY: buttonY }]
                    }
                    // ]
                }>
                    <TapGestureHandler onHandlerStateChange={() => { onSignInPress("SignIn") }}>
                        <Animated.View style={styles.imageSignInContainer}>
                            <Text style={styles.imageSignInText}>Sign In</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={() => { onSignInPress("SignUp") }}>
                        <Animated.View style={styles.imageSignInContainer}>
                            <Text style={styles.imageSignInText}>Sign Up</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    {/* <TapGestureHandler onHandlerStateChange={clickMe}>
                        <View style={{
                            ...styles.imageSignInContainer,
                            backgroundColor: "#3B5998",
                        }}
                        >
                            <Text style={{
                                ...styles.imageSignInText,
                                color: "white"
                            }}
                            >SignIn with Facebook</Text>
                        </View>
                    </TapGestureHandler> */}
                </Animated.View>
            </View>
            <Animated.View style={
                // [
                // styles.imageButtonView,
                {
                    opacity: signInAnim,
                    transform: [{ translateY: buttonY }]
                }
                // ]
            }>
                <TapGestureHandler onHandlerStateChange={clickMe}>
                    {/* <View onPress={clickMe}>
                        <Text style={{ fontSize: 40 }}>Hello</Text>
                    </View> */}
                    <View style={{
                        ...styles.imageSignInContainer,
                        backgroundColor: "#3B5998",
                    }}
                    >
                        <Text style={{
                            ...styles.imageSignInText,
                            color: "white"
                        }}
                        >SignIn with Facebook</Text>
                    </View>
                </TapGestureHandler>
            </Animated.View>
        </>

    );
}

export default LoginButton;

const styles = StyleSheet.create({
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
    },
    imageButtonView: {
        top: -40,
        justifyContent: "center"
    },
});
