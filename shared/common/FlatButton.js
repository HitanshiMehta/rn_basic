import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native'
import Colors from '../../constants/review/Colors'

const FlatButton = props => {
    const { text, onPress, buttonContainer, buttonText } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={
                { ...styles.button, ...buttonContainer }
            }>
                <Text style={{
                    ...styles.buttonText,
                    ...buttonText
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
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 10
    },
    buttonText: {
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.white,
        fontSize: 18
    }
});