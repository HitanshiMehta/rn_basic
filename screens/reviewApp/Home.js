import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { globalStyles } from '../../styles/review/ReviewStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../shared/common/Card';
import Colors from '../../constants/review/Colors'
import ReviewForm from './ReviewForm';

const Home = props => {
    const { navigation } = props
    const [visibility, setVisibility] = useState(false)
    const [reviews, setReviews] = useState()

    useEffect(() => {
        async function review() {
            let reviews = await AsyncStorage.getItem('reviews')
            if (reviews === null) {
                AsyncStorage.setItem('reviews', JSON.stringify([]))
            }
            else {
                reviews = JSON.parse(reviews)
                setReviews(reviews)
            }
        }
        review()
    }, [])

    const openModal = () => {
        setVisibility(true)
    }
    const closeModal = () => {
        setVisibility(false)
    }
    const addReview = async review => {
        review.key = Math.random().toString()
        try {
            reviews.push(review)
            setReviews((currentReviews) => {
                return currentReviews
            })
            AsyncStorage.setItem('reviews', JSON.stringify(reviews))
            setVisibility(false)
        } catch (error) {
            console.log(error)
        }
    }
    const removeItemValue = async () => {
        try {
            await AsyncStorage.removeItem('reviews');
            setReviews()
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    return (
        <View style={globalStyles.screen}>

            <Modal
                visible={visibility}
                animationType="slide"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            style={{ ...globalStyles.iconWithBorder, ...styles.modalClose }}
                            onPress={closeModal}
                            name="close"
                            size={30}
                        />
                        <ReviewForm
                            addReview={addReview} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons
                style={globalStyles.iconWithBorder}
                onPress={openModal}
                name="add"
                size={30}
            />

            <Text style={globalStyles.title}>Reviews</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Review', {
                            ...item,
                            // onDelete: handleDelete
                            setReviews: setReviews
                        })}>
                        <Card >
                            <ImageBackground
                                source={require('../../assets/Images/review/game_bg.png')}
                                style={styles.listBackground}
                            >
                                < Text style={styles.reviewList}>
                                    {item.title}
                                </Text>
                            </ImageBackground>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            {reviews && reviews.length > 0 && <Button title="Delete All" onPress={removeItemValue} />}
        </View >
    );
}

export default Home;

const styles = StyleSheet.create({
    reviewList: {
        fontFamily: "nuinto-bold",
        fontSize: 20,
        marginLeft: 10,
        color: Colors.primary,
        fontWeight: "bold"
    },
    listBackground: {
        width: "100%",
        height: 'auto',
        resizeMode: 'stretch',
        flex: 1
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0
    },
    modalContent: {
        flex: 1,
        padding: 20,
    }
});