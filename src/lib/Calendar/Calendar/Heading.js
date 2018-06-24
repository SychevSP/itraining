import React from 'react';
import { Text, View } from 'react-native';

import * as Engine from '../utils';

export default function Heading () {
    const baseStyle = {width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: 'azure'};
    return (
        <View style = {{flexDirection: 'row',flex: 1, justifyContent: 'space-between'}}>
            {Engine.weekDays.map((e, i) => (<View key = {i} style = {baseStyle}><Text style ={{textAlign: 'center', fontSize: 16}}>{e}</Text></View>))}
        </View>
    );
}
