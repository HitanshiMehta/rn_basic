import React from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    TextInput,
    Easing,
    Keyboard,
    Text
} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as yup from 'yup'

import { globalStyles } from '../../styles/review/ReviewStyle';
import FlatButton from '../../shared/common/FlatButton'
import Colors from '../../constants/review/Colors'

import * as firebase from 'firebase'

const { height } = Dimensions.get('window')
const halfHeight = height / 2
const rHeight = height / 10

const loginSchema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup.string()
        .required()
        .min(8, 'Password is too short - should be 8 chars minimum.')
})

const LoginForm = props => {
    const { signInAnim,
        setBgY,
        isKeyboardVisible,
        setKeyboardVisible,
        isItSignUp
    } = props
    const formZIndex = signInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, -1],
    });

    const formOpacity = signInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const formTransform = signInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    const rotateCross = signInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg']
    })

    const onClosePress = async () => {
        // While closing form if keybord is open we are dismissing it.
        Keyboard.dismiss()
        // Setting state of keyboard to false
        await setKeyboardVisible(false)
        Animated.timing(
            signInAnim,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.elastic(),
                useNativeDriver: false
            }
        ).start();
        // Once keybord is close we want to move x position to 0
        if (!isKeyboardVisible) {
            setBgY(
                signInAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-halfHeight, 0]
                })
            )
        }

    }

    const handleSubmit = values => {
        if (values.isSignUp) {
            firebase.auth().createUserWithEmailAndPassword(
                values.email,
                values.password)
        } else {
            firebase.auth().signInWithEmailAndPassword(
                values.email,
                values.password
            )
        }
    }

    return (
        <Animated.View style={[
            styles.signIn,
            {
                zIndex: formZIndex,
                opacity: formOpacity,
                transform: [{ translateY: formTransform }],
                // backgroundColor: "blue"
            }
        ]}>
            <>
                <TapGestureHandler onHandlerStateChange={onClosePress}>
                    {/* <View style={styles.cancelButtonContainer}> */}
                    <Animated.View style={styles.cancelButton}>
                        <Animated.Text style={
                            [
                                styles.cancelButtonText,
                                { transform: [{ rotate: rotateCross }] }
                            ]
                        }>
                            X
                    </Animated.Text>
                    </Animated.View>
                    {/* </View> */}
                </TapGestureHandler>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        isSignUp: false
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => (
                        <View style={styles.signInForm}>
                            <TextInput
                                placeholder="EMAIL"
                                style={[
                                    globalStyles.input,
                                    {
                                        borderColor: Colors.darkPurple,
                                        marginHorizontal: 20,
                                        marginTop: 40
                                    }
                                ]}
                                placeholderTextColor={Colors.darkPurple}
                                onChangeText={formikProps.handleChange('email')}
                                value={formikProps.values.email}
                                onBlur={formikProps.handleBlur('email')}
                            />
                            <Text style={globalStyles.error}>
                                {formikProps.touched.email && formikProps.errors.email}
                            </Text>
                            <TextInput
                                secureTextEntry
                                placeholder="PASSWORD"
                                style={[
                                    globalStyles.input,
                                    {
                                        borderColor: Colors.darkPurple,
                                        marginHorizontal: 20,
                                    }
                                ]}
                                placeholderTextColor={Colors.darkPurple}
                                onChangeText={formikProps.handleChange('password')}
                                value={formikProps.values.password}
                                onBlur={formikProps.handleBlur('password')}
                            />
                            <Text style={globalStyles.error}>
                                {formikProps.touched.password && formikProps.errors.password}
                            </Text>
                            <Animated.View>
                            </Animated.View>
                            {isItSignUp ?
                                <Animated.View>
                                    <FlatButton
                                        text="SIGN UP"
                                        buttonText={styles.signInText}
                                        buttonContainer={styles.signInContainer}
                                        onPress={() => {
                                            formikProps.handleSubmit()
                                            formikProps.setFieldValue("isSignUp", true, false)
                                        }
                                        }
                                    />
                                </Animated.View>
                                :
                                <Animated.View>
                                    <FlatButton
                                        text="SIGN IN"
                                        buttonText={styles.signInText}
                                        buttonContainer={styles.signInContainer}
                                        onPress={formikProps.handleSubmit}
                                    />
                                </Animated.View>

                            }
                        </View>
                    )}
                </Formik>
            </>
        </Animated.View>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    signIn: {
        ...StyleSheet.absoluteFill,
        height: halfHeight,
        top: null,
        justifyContent: "flex-start"
    },
    signInForm: {
        flex: 1,
        justifyContent: "center"
    },
    // cancelButtonContainer: {
    //     flex: 1,
    //     justifyContent: "flex-end",
    //     top: 20
    // },
    cancelButton: {
        height: 40,
        width: 40,
        backgroundColor: Colors.darkPurple,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        top: 30
    },
    cancelButtonText: {
        fontSize: 20,
        color: Colors.white
    },
    signInText: {
        color: Colors.white,
        fontSize: 20
    },
    signInContainer: {
        margin: 10,
        backgroundColor: Colors.darkPurple,
        marginHorizontal: 20
    }
});