import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { updateSchedule, activateProgram } from '/actions';
import { Calendar } from '/lib/Calendar/Calendar';
import {MS_IN_DAY} from '/lib/Calendar/utils';

class Schedule extends React.Component {

    activateProgram = () => {
        this.props.dispatch(activateProgram());
        const gotoMainNav = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MainNavigator' }),
            ]
        });
        this.props.navigation.dispatch(gotoMainNav);

    };



    _updateSchedule = ({ eventDate }) => {
        this.props.dispatch (updateSchedule(eventDate));
    };


    render () {
        const events = this.props.dates;
        let firstDate;
        let lastDate;
        let touchableMode = 'ALL';
        let text = 'Выберите первый день тренировки';
        if (events && events.length) {
            firstDate = events[0];
            lastDate = firstDate + 6 * MS_IN_DAY;
            touchableMode = 'INTERVAL';
            text = 'Выберите расписание на неделю';
        }
        if (this.props.isComplete) touchableMode = 'DIM_ALL';

        console.log(events);

        return (
            <View style = {{flex: 1}}>
                <Text style = {{fontSize: 16}}>{text}</Text>
                <View style = {{flex: 10}}>
                    <Calendar
                        onPress = {this._updateSchedule}
                        events = {events}
                        firstSelectableDate = {firstDate}
                        lastSelectableDate = {lastDate}
                        touchableMode = {touchableMode}
                        />
                </View>
                <View style = {{flex: 1}}>
                    {(this.props.isComplete) && (
                    <Button onPress = {this.activateProgram} text = 'Далее'/>
                    )}
                </View>

            </View>
        )
    }


}

export default connect (state => ({
    dates: state.schedule.dates,
    isComplete: state.schedule.isComplete,
}))(Schedule);

/*

 */
/*

 */