import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function Instruction (props) {
    return (
        <View style = {styles.mainVew}>
            <View style = {styles.rect}>
                <Text style = {styles.text}>
                    {props.text}
                </Text>
            </View>
            <View style = {styles.triangle}/>
        </View>
    );
}

