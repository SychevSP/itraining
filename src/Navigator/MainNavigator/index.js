import React from 'react';
import { TabNavigator } from 'react-navigation';

import navPaths from './navPaths';
import MainHeader from './Header';

export default TabNavigator(
    navPaths,
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        //initialRouteName: 'DashBoard',
        initialRouteName: 'ChatRoom',
        navigationOptions: ({ navigation }) => {
            return {headerTitle: <MainHeader navigation={navigation}/>}
        },
    }
);