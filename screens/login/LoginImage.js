import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'

const { width, height } = Dimensions.get('window')
const rHeight = height / 10

const LoginImage = props => {
    const { bgY } = props
    return (
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
    );
}

export default LoginImage;

const styles = StyleSheet.create({
    imageContainer: {
        ...StyleSheet.absoluteFill,
    },
});