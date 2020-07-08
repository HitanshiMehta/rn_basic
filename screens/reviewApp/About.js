import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '../../styles/review/ReviewStyle'

const About = () => {
    return (
        <View style={globalStyles.screen}>
            <Text style={globalStyles.title}>About Screen</Text>
        </View>
    );
}

export default About;

const styles = StyleSheet.create({
});