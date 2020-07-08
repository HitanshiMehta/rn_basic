import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native'
import { color } from 'react-native-reanimated';

const FlatButton = props => {
    const { text, onPress, bgColor, color, fontSize } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                ...styles.button,
                backgroundColor: bgColor,
            }}>
                <Text style={{
                    ...styles.buttonText,
                    color: color,
                    fontSize: fontSize
                }}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity >
    );
}

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center"
    }
});