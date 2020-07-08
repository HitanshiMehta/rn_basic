import React, { useState } from 'react';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Navigator from '../../routes/review/drawer'

const getFonts = () => Font.loadAsync({
    'nunito-regular': require('../../assets/fonts/nunito/Nunito-Regular.ttf'),
    'nuinto-bold': require('../../assets/fonts/nunito/Nunito-Bold.ttf')
})


const ContainerScreen = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if (fontsLoaded) {
        return (
            <Navigator />
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
            />
        )
    }
}

export default ContainerScreen;