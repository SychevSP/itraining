import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

export default MainHeader = props => {
    return (
        <TouchableOpacity onPress = {()=> props.navigation.navigate('Profile')} style = {{alignSelf: 'center'}}>
            <Image source = {require('Assets/profile.png')}/>
        </TouchableOpacity>
    )
};