import React from 'react';
import { Picker, Platform } from 'react-native';

import styles from './styles';

export default function (props) {

    return (
        <Picker
            mode = 'dropdown'
            //selectedValue={props.value}
            style={Platform.OS === 'ios' ? null : {color: 'white'}}
            onValueChange ={(itemValue, itemIndex) => props.onChange(itemValue)}>
            {props.options.map ((e, i) => <Picker.Item
                key = {i}
                label={e}
                value={e}
                color ={Platform.OS === 'ios' ? 'white' : 'black'}
                />)}
        </Picker>
    )
}

