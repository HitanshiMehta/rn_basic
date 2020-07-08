import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { globalStyles, images } from '../../styles/review/ReviewStyle'
import { Ionicons } from '@expo/vector-icons';
import Card from '../../shared/common/Card'
import Colors from '../../constants/review/Colors'


const Review = props => {
    const { navigation } = props
    const setReviews = navigation.getParam('setReviews')
    const key = navigation.getParam('key')
    const title = navigation.getParam('title')
    const body = navigation.getParam('body')
    const rating = navigation.getParam('rating')

    const handleDelete = () => {
        setReviews(currentReview => {
            return currentReview.filter(review => review.key !== key)
        })
        navigation.goBack()
    }
    return (
        <View style={globalStyles.screen}>
            <Card>
                <Text style={globalStyles.text}>{title}</Text>
                <Text style={globalStyles.text}>{body}</Text>
                <View style={styles.rating}>
                    <Text style={globalStyles.text}>Rating: </Text>
                    <Image
                        source={images.ratings[rating]} />
                </View>
            </Card>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="md-trash"
                    size={34}
                    color={Colors.darkRed}
                    onPress={handleDelete}
                />
            </View>
        </View>
    );
}

export default Review;

const styles = StyleSheet.create({
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 3,
        borderTopColor: Colors.grey
    },
    iconContainer: {
        alignItems: "center",
        padding: 10,
    }
});