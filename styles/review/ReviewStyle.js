import { StyleSheet } from 'react-native'
import Colors from '../../constants/review/Colors'

export const globalStyles = StyleSheet.create({
    screen: {
        padding: 20,
        flex: 1
    },
    title: {
        fontFamily: "nuinto-bold",
        fontSize: 20,
        color: Colors.darkGrey
    },
    text: {
        fontFamily: "nuinto-bold",
        fontSize: 18,
        color: Colors.darkBlue
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        color: Colors.darkBlue,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
    },
    iconWithBorder: {
        color: Colors.darkGrey,
        borderWidth: 2,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderColor: Colors.darkGrey,
        marginBottom: 10,
        paddingLeft: 5,
        paddingTop: 5,
        alignSelf: "center",
    },
    error: {
        color: 'crimson',
        fontSize: 18,
        marginLeft: 20
    }
});

export const images = {
    ratings: {
        '1': require('../../assets/Images/review/rating-1.png'),
        '2': require('../../assets/Images/review/rating-2.png'),
        '3': require('../../assets/Images/review/rating-3.png'),
        '4': require('../../assets/Images/review/rating-4.png'),
        '5': require('../../assets/Images/review/rating-5.png'),
    }
}