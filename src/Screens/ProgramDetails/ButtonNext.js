import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ButtonNext (props) {

    //Во время отдых сркываем кнопку
    if (props.state === 'break') {
        return (
            <View style = {{flex: 1}}/>
        );
    }

    //Задаем текст кнопки
    let buttonText1;
    switch (props.state) {
        case 'begin':
            buttonText1 = 'Начать подход';
            break;
        case 'training':
            buttonText1 = 'Подход окончен';
            break;
        case 'dayComplete':
            buttonText1 = 'Завершить';
            break;
        case 'programComplete':
            buttonText1 = 'Завершить';
            break;
    }

    let buttonText2;
    buttonText2 = props.showSlider ? 'Отмена' :'Не все получилось';

    //
    let ButtonPane;
    if (props.state === 'training'){
        ButtonPane = (
            <View style ={{flex: 3, flexDirection: 'row'}}>
                <View style = {{flex: 1}}/>
                <TouchableOpacity onPress = {() => props.dispatch({type: 'PROGRESS_CHANGED'})} style ={{flex: 6}}>
                    <View style ={{flex: 1, backgroundColor: 'red', justifyContent: 'center', margin: 5}}>
                        <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>{buttonText1}</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flex: 1}}/>
                <TouchableOpacity onPress = {() => props.toggleSlider()} style ={{flex: 6}}>
                    <View style ={{flex: 1, backgroundColor: 'red', justifyContent: 'center', margin: 5}}>
                        <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>{buttonText2}</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{flex: 1}}/>
            </View>
        );
    } else if (props.state === 'dayComplete' || props.state === 'programComplete') {
        ButtonPane = (
            <TouchableOpacity
                onPress = {() => {
                props.dispatch({type: 'PROGRESS_CHANGED'});
                props.navigation.goBack();
                }}
                style ={{flex: 1, marginLeft: '10%', marginRight: '10%'}}>
                <View style ={{flex: 1, backgroundColor: 'red', justifyContent: 'center', margin: 5}}>
                    <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>{buttonText1}</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        ButtonPane = (
            <TouchableOpacity onPress = {() => props.dispatch({type: 'PROGRESS_CHANGED'})} style ={{flex: 1, marginLeft: '10%', marginRight: '10%'}}>
                <View style ={{flex: 1, backgroundColor: 'red', justifyContent: 'center', margin: 5}}>
                    <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>{buttonText1}</Text>
                </View>
            </TouchableOpacity>
        );

    }



    return (
        <View style = {{flex: 1}}>
            {ButtonPane}
        </View>
    );
}
