import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';

import styles from './styles';

export default Button = props => {

    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[styles.shapeCommon, props.disabled ? null : styles.shapeActive, props.style ]}
            disabled = {props.disabled}
            >
            <Text style={styles.textCommon}>{props.text}</Text>
        </TouchableOpacity>
    );
};

