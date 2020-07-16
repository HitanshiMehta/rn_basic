import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'

import { globalStyles } from '../../styles/review/ReviewStyle';
import FlatButton from '../../shared/common/FlatButton'
import Colors from '../../constants/review/Colors'
import RunTiming from '../../shared/common/RunTiming'

const { width, height } = Dimensions.get('window')
const rHeight = height / 10
const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    interpolate,
    Extrapolate,
    concat
} = Animated
class Login extends Component {
    constructor(props) {
        super(props)
        this.buttonOpacity = new Value(1)
        this.onStateChange = event([
            {
                nativeEvent: (
                    { state }
                ) => block(
                    [
                        cond(eq(state, State.END), set(this.buttonOpacity,
                            RunTiming(new Clock(), 1, 0)))
                    ]
                )
            }
        ])
        this.onCloseState = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity,
                        RunTiming(new Clock(), 0, 1)))
                ])
            }
        ])
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - rHeight, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })

    }
    render() {
        return (
            <View style={styles.screen}>

                {/* This view will display background image */}
                <Animated.View
                    style={
                        {
                            ...StyleSheet.absoluteFill,
                            transform: [{ translateY: this.bgY }]
                        }
                    }
                >
                    {/* Background image */}
                    <Svg height={height + rHeight} width={width}>
                        <ClipPath id="clip">
                            <Circle
                                r={height + rHeight}
                                cx={width / 2} />
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
                <Animated.View style={{
                    ...styles.imageButton,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }]
                }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>SIGN IN</Text>
                        </Animated.View>
                    </TapGestureHandler>
                </Animated.View>
                <Animated.View style={{
                    zIndex: this.textInputZindex,
                    opacity: this.textInputOpacity,
                    transform: [{ translateY: this.textInputY }],
                    ...styles.singIn
                }}>
                    <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                        <Animated.View style={styles.cancelButton}>
                            <Animated.Text style={{
                                ...styles.cancelButtonText,
                                transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                            }}>
                                X
                            </Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <TextInput
                        placeholder="EMAIL"
                        style={{
                            ...globalStyles.input,
                            borderColor: Colors.darkPurple,
                            marginHorizontal: 20,
                            marginTop: 40
                        }}
                        placeholderTextColor={Colors.darkPurple}
                    />
                    <TextInput
                        placeholder="PASSWORD"
                        style={{
                            ...globalStyles.input,
                            borderColor: Colors.darkPurple,
                            marginHorizontal: 20,
                        }}
                        placeholderTextColor={Colors.darkPurple}
                    />
                    <Animated.View>
                        <FlatButton
                            text="SIGN IN"
                            buttonText={styles.signInText}
                            buttonContainer={styles.signInContainer}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        )
    }
}

export default Login


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    imageButton: {
        height: height / 3,
        justifyContent: "center"
    },
    singIn: {
        height: height / 3,
        ...StyleSheet.absoluteFill,
        top: null,
        justifyContent: "center",
    },
    cancelButton: {
        flex: 1,
        height: 40,
        width: 40,
        backgroundColor: Colors.darkPurple,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        top: -20
    },
    cancelButtonText: {
        fontSize: 20,
        color: Colors.white
    },
    buttonText: {
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        color: Colors.darkPurple,
        fontSize: 24
    },
    buttonContainer: {
        margin: 10,
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10
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