import React from 'react';
import { Text, View } from 'react-native';

import Slider from './Slider';

export default function RoundInfo (props) {

    //Если нет предыдущего/ следующего упражнения, то выводим альтернативный текст
    if (props.progress === null) {
        return (
            <View style ={{flex: 3, justifyContent: 'center'}}>
                <Text style = {[{fontSize: 16, color: 'green', textAlign: 'center'}, fontColor]}>{props.altText}</Text>
            </View>
        );
    }

    //для удобства создаем переменные
    const exercise = props.dayRoutine[props.progress.ex];
    const round = exercise.rounds[props.progress.round];

    //Стиль для неактивного упражнения
    const fontColor = props.dimmed ? {color: 'gray'} : {};
    const fillStyle = props.dimmed ? {} : {backgroundColor: 'beige'};

    const flexNum = props.showSlider ? 5 : 3;

    return (
        <View style ={[{flex: flexNum}, fillStyle]}>
            <Text style = {[{fontSize: 16, color: 'green'}, fontColor]}>{data.exercises[exercise.exId].name}</Text>
            <Text style = {fontColor}>Подоход {props.progress.round + 1} из {exercise.rounds.length} </Text>
            <Text style = {fontColor}>Вес: {round.weight}</Text>
            <Text style = {fontColor}>Повторений: {round.reps}</Text>
            {props.showSlider && <SliderView maxVal = {round.reps}/>}
        </View>
    );
}

function BreakInfo (props) {
    const fontColor = props.dimmed ? {color: 'gray'} : {};
    const fillStyle = props.dimmed ? {} : {backgroundColor: 'beige'};
    return (
        <View style = {fillStyle}>
            <Text style = {[{fontSize: 16, color: 'green'}, fontColor]}>Отдых</Text>
        </View>
    );
}

