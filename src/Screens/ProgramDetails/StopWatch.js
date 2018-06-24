import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class StopWatch extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            time: this.props.time,
            isRunning: true,
        };
        this.timer = setInterval(this.changeTime, 1000);

    }


    changeTime = () => {
        const nextTime = this.state.time - 1;
        if (nextTime < 0) {
            this.setState({isRunning: false});
            clearInterval(this.timer);
            this.props.stopWatchHook();
        } else {
            this.setState({time: nextTime});
        }
    };


    startTimer = () => {
        //Перезапускаем таймер
        if (this.state.time <= 0) {
            this.setState({time: this.props.time});
        }
        //Останавливаем таймер
        if (this.state.isRunning) {
            this.setState({isRunning: false});
            clearInterval(this.timer);
        } else {
            this.setState({isRunning: true});
            this.timer = setInterval(this.changeTime, 1000);
        }
    };

    componentWillUnmount () {
        clearInterval(this.timer);
    }

    render () {
        if (!this.props.time) return (<View style = {{flex: 1}}/>);
        //if (!this.props.shouldShow) return (<View style = {{flex: 1}}/>);
        //Разбиваем на минуты и секунды
        const timeInSeconds = this.state.time;
        let seconds = timeInSeconds % 60;
        let minutes = timeInSeconds - seconds;
        //формат
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        return (
            <View style = {{flex: 1, alignItems: 'stretch'}}>
                <Text style ={{color: 'green', fontSize: 24, textAlign: 'center'}}> {minutes} : {seconds}</Text>
                <TouchableOpacity onPress = {this.startTimer} style ={{flex: 1, marginLeft: '10%', marginRight: '10%'}}>
                    <View style ={{flex: 1, backgroundColor: 'red', justifyContent: 'center', margin: 5}}>
                        <Text style ={{color: 'white', fontSize: 20, textAlign: 'center'}}>{this.state.isRunning ? 'Пауза' : 'Продолжить'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}
