import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/review/ReviewStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/common/Card';
import Colors from '../../constants/review/Colors'

const Auth = () => {
    return (
        <View style={styles.screen}>
            <Text>Auth Screen</Text>
        </View>
    );
}

export default Auth;

const styles = StyleSheet.create({
    screen: {

    }
});