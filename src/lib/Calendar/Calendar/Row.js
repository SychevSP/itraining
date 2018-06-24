import React from 'react';
import { View } from 'react-native';

export default function CalendarRow (props) {
    return (
        <View style = {{flexDirection: 'row',flex: 1, justifyContent: 'space-between'}}>
            {props.children}
        </View>
    )
}
