import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/review/Colors'

const Header = props => {
    const { navigation, title } = props
    const openMenu = () => {
        navigation.openDrawer()
    }
    return (
        <View style={styles.header}>
            <MaterialIcons
                name="menu"
                size={32}
                style={styles.menuIcon}
                onPress={openMenu} />
            <View style={styles.headerTitle}>
                <Image
                    source={require('../../assets/Images/review/heart_logo.png')}
                    style={styles.headerImage} />
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: Colors.grey,
        letterSpacing: 1
    },
    menuIcon: {
        position: "absolute",
        left: 5,
        color: Colors.grey
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10
    },
    headerTitle: {
        flexDirection: "row"
    }
});