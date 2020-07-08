import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/review/Colors'

const Card = props => {
    const { children } = props;
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: Colors.white,
        shadowOffset: {
            width: 1, height: 1
        },
        shadowOpacity: 0.3,
        shadowColor: Colors.grey,
        shadowRadius: 4,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent: {
        marginHorizontal:10,
        marginVertical:10,
    }
});