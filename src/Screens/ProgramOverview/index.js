import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { getMonthNameDecl, getWeekDayName, getToday } from '/lib/Calendar/utils';
import Button from '/Components/Button'
import styles from './styles';

class ProgramOverview extends React.Component {

    constructor (props) {
        super(props);
        const activeDay = props.activeDay;
        this.state = {
            activeDay: activeDay,
            activeEx: null,
            trainingDate: this.props.dates[activeDay],
            today: getToday(),
        };
    }


    changeActiveDay = (diff) => {
        //Определяем какой день открыть
        const newDay = this.state.activeDay + diff;
        //меняем стейт, чтобы отрендерить основной экан
        this.setState ({
            activeDay: newDay,
            trainingDate: this.props.dates [newDay],
            activeEx: null,
        });
        //Закрываем все раскрытые рамки с описанием упражнения
        //this.setState ({activeEx: null});
    };


    showDetails = (exIndex) => {
        if (exIndex === this.state.activeEx) {
            //Если описание раскрыто, то закрываем его
            this.setState({activeEx: null});
        } else {
            //Если не раскрыто, то открываем
            this.setState({activeEx: exIndex});
        }

    };

    startProgram = () => {
        Alert.alert ('Раздел в разработке');
        /*this.props.navigation.navigate(
            'ProgramDetails',
            {day: this.state.activeDay}
        );*/
    };

    render() {

        //кнопка начать тренировку
        //Или сообщение о том, что тренировка закончена
        let startButton;
        if (this.props.progress.day > this.state.activeDay) {
            startButton = (<Text style ={styles.textComplete}>Тренировка завершена</Text>);
        } else if (this.state.trainingDate === this.state.today) {
            startButton = (<Button onPress = {this.startProgram} text = 'Начать тренировку'/>);
        }

        return (
            <View style={styles.container}>
                <TrainingDate date = {this.state.trainingDate}/>
                <View style = {{flex: 1}}>
                    {startButton}
                </View>
                <View style = {{flex: 8}}>
                    {renderDayRoutine (this.props.routine[this.state.activeDay], this.showDetails, this.state.activeEx)}
                </View>
                <View style = {{flex: 1}}>
                    <ChangeDayButtons
                     isFirst = {this.state.activeDay === 0}
                     isLast = {this.state.activeDay === this.props.routine.length - 1}
                     onPress = {this.changeActiveDay}
                     />
                </View>
            </View>
        );

    }

}


export default connect(mapStaeToProps)(ProgramOverview);


function mapStaeToProps (state, ownProps) {
    return ({
        progress: state.program.progress,
        routine: state.program.routine,
        dates: state.schedule.dates,
        activeDay: ownProps.navigation.state.params.activeDay,
    });
}

//TO DO convert to object
function renderDayRoutine (dayRoutine, showDetails, activeEx) {

    dayRoutine = dayRoutine.map((e, i) => ({...e, key: i}));

    function renderItem ({ item }) {
        //console.log('in renderItem');
        //console.log(item);
        const bColor = (activeEx === item.key) ? 'green' : 'beige';
        return (
            <View style ={[styles.exerciseBlob, {borderColor: bColor}]}>
                <TouchableOpacity onPress = {() => showDetails(item.key)}>
                    <Text style ={styles.textNormal}>{item.exName}</Text>
                    {(activeEx === item.key) && renderEx(item)}
                </TouchableOpacity>
            </View>
        );
    }

    function renderEx (Ex) {
        return (
            <View>
                {Ex.rounds.map((e, i) => (
                    <View key ={i}>
                        <Text>
                            Подход {i+1}{'\n'}
                            {e.weight ? ('Вес: ' + e.weight + '\n') : ""}
                            Повторений: {e.reps + ((e.multiplier > 1) ? ' X' + e.multiplier : '')}
                        </Text>
                    </View>
                )
                )}
            </View>
        );
    }

    return (
        <FlatList
            contentContainerStyle = {{alignItems: 'stretch', marginLeft: '10%', marginRight: '10%'}}
            data = {dayRoutine}
            renderItem={renderItem}
            />
    );
}

function ChangeDayButtons (props) {
    return (
        <View style ={{flex: 1, flexDirection: 'row'}}>
            {(!props.isFirst) && (<View style ={{flex: 1}}>
                <Button onPress = {() => props.onPress(-1)} text ={'<<<'}/>
            </View>)}
            {(!props.isLast) && (<View style ={{flex: 1}}>
                <Button onPress = {() => props.onPress(1)} text ={'>>>'}/>
            </View>)}

        </View>
    );
}

function TrainingDate ({ date }) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const weekDay = getWeekDayName(dateObj.getDay());
    const month = getMonthNameDecl(dateObj.getMonth());

    return (
        <View style = {{flex: 0}}>
            <Text style ={{fontSize: 16, color: 'green', textAlign: 'center'}}>{day} {month}</Text>
            <Text style ={{fontSize: 16, color: 'green', textAlign: 'center'}}>{weekDay}</Text>
        </View>
    );
}