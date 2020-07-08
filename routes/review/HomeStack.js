import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../../screens/reviewApp/Home'
import Review from '../../screens/reviewApp/Review'
import Colors from '../../constants/review/Colors'
import Header from '../../shared/review/Header'

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header
                    navigation={navigation}
                    title="Game Zone"
                />
            }
        }
    }, Review: {
        screen: Review,
        navigationOptions: {
            title: "Review Details",
        },
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary,
            height: 80
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.grey
        }
    }
})

export default HomeStack