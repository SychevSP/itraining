import React from 'react';
import { ImageBackground } from 'react-native';

export default function BcgIMG (props) {
    return (
        <ImageBackground
            style={{flex:1, height: undefined, width: undefined}}
            resizeMode = {'cover'}
            source = {require('Assets/BcgImg.png')}
            >
            {props.children}
            </ImageBackground>
    );
}

