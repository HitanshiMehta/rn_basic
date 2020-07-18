import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { View, Text, StyleSheet } from 'react-native'
import LoadingScreen from './LoadingScreen';
import LoginContainer from '../login/ContainerScreen'
import Home from './Home';

const ContainerScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>ContainerScreen Screen</Text>
        </View>
    );
}

export default ContainerScreen;

const styles = StyleSheet.create({
    screen: {

    }
});