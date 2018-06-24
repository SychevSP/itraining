import React from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

export default function (props) {

return (
    <TextInput
        defaultValue = {props.value}
        autoFocus = {true}
        style = {styles.input}
        multiline = {false}
        keyboardType = {'numeric'}
        onChangeText  = {(text) => {props.onChange(text)}}
        onSubmitEditing = {props.onOK}
        />
    )
}