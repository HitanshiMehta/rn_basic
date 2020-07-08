import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/review/ReviewStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/common/Card';
import Colors from '../../constants/review/Colors'

const About = () => {
    return (
        <View style={styles.screen}>
            <Text>About Screen</Text>
        </View>
    );
}

export default About;

const styles = StyleSheet.create({
    screen: {

    }
});