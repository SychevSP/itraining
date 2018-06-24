import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function CalendarCell (props) {

    const _onPress = () => props.onPress(props.dateOffset);

    const baseStyle = {width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'azure'};
    const additionalStyles = [
        props.isWeekEnd ? {backgroundColor: 'beige'} : null,
        props.isToday ? {borderColor: 'lime', borderWidth: 3} : null,
        props.dimmed ? {backgroundColor: 'transparent'} : null,
        props.hasEvent ? {backgroundColor: 'lightblue'} : null,
    ];


    return (
        <TouchableOpacity style = {{flex: 1}} onPress = {_onPress} disabled = {!props.touchable}>
            <View style = {[baseStyle, ...additionalStyles]}>
                <Text style ={{textAlign: 'center', fontSize: 16, color: props.isActive? 'black' : 'gray' }}>{props.datePres}</Text>
            </View>
        </TouchableOpacity>

    )
}
