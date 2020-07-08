import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../../constants/review/Colors'
import About from '../../screens/reviewApp/About'
import Header from '../../shared/review/Header'

const screens = {
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header
                    navigation={navigation}
                    title="About Game Zone" />
            }
        }
    }
}

const AboutStack = createStackNavigator(screens, {
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

export default AboutStack