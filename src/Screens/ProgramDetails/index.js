import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Slider } from 'react-native';
import { connect } from 'react-redux';
import { data, nextExIndex, prevExIndex } from '/data';
import ButtonNext from './ButtonNext';
import RoundInfo from './RoundInfo';
import StopWatch from './StopWatch';
import Button from 'Components/Button';

class ProgramDetails extends React.Component {

    static navigationOptions = {
        title: 'Тренировка'
    };

    state = {
        showSlider: false,
    };

    currentEx = null;
    previousEx = null;
    nextEx = null;

    toggleSlider = () => {
        this.setState ({showSlider: !this.state.showSlider})
    };

    //Скрываем слайдер после обновления
    componentWillReceiveProps() {
        this.setState({showSlider: false});
    }

    render () {
        const { routine, progress } = this.props;

        const activeExIndex = progress.ex;
        const activeRoundIndex = progress.round;
        const isFirst = !activeExIndex && !activeRoundIndex;

        //Рассчитываем подходы
        if (!this.currentEx || progress.state === 'begin' || progress.state === 'training') {
            //Текущий подход
            this.currentEx = {
                ex: activeExIndex,
                round: activeRoundIndex,
            };
            console.log('updated currentEx');
            console.log(this.currentEx);
            //Предыдущий подход
            this.previousEx = prevExIndex({
                dayRoutine: this.props.routine,
                ex: this.props.progress.ex,
                round: this.props.progress.round,
            });
            //Следующий подход
            this.nextEx = nextExIndex({
                dayRoutine: this.props.routine,
                ex: this.props.progress.ex,
                round: this.props.progress.round,
            });
            //Если упражнение последнее, то обнуляем nextEx
            if (!this.nextEx.ex && !this.nextEx.round) this.nextEx = null;
        }

        return (
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
                <ProgressBar
                    index={activeExIndex}
                    length={this.props.routine.length}
                    />
                <View style ={{flex: 10, justifyContent: 'flex-start'}}>
                    <View style = {{flex: 10}}>
                    <View style = {{flex: 5}}>
                        <RoundInfo
                            dayRoutine = {routine}
                            progress = {this.previousEx}
                            altText = {'Начало тренировки'}
                            dimmed = {true}
                            />
                        {!isFirst && <BreakInfo dimmed = {true}/>}
                        <RoundInfo
                            dayRoutine = {routine}
                            progress = {this.currentEx}
                            dimmed = {this.props.progress.state === 'break'}
                            showSlider = {this.state.showSlider}
                            />
                        <BreakInfo dimmed = {this.props.progress.state !== 'break'}/>
                        <RoundInfo
                            dayRoutine = {routine}
                            progress = {this.nextEx}
                            altText = {'Окончание тренировки'}
                            dimmed = {true}
                            />
                    </View>

                        {(progress.state  === 'break')
                            ?
                            <StopWatch time={1} stopWatchHook = {() => this.props.dispatch({type: 'PROGRESS_CHANGED'})}/>
                            :
                            <View style ={{flex: 1}}>
                                <ButtonNext
                                    state = {this.props.progress.state}
                                    dispatch = {this.props.dispatch}
                                    showSlider = {this.state.showSlider}
                                    toggleSlider = {this.toggleSlider}
                                    navigation = {this.props.navigation}
                                    />

                            </View>
                    }

                    <View style ={{flex: 1}}>
                        <Button
                            onPress= {this.props.navigation.navigate('ChatRoom')}
                            text = {'Напсать сообщение'}
                            />
                    </View>
                    </View>
                </View>

            </View>
        );
    }
}



export default connect((state, ownProps) => ({
            routine: state.routine[ownProps.navigation.state.params.day],
            progress: state.progress,
        })
)(ProgramDetails);


