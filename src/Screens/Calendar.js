import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Calendar } from 'lib/Calendar/Calendar';


function MainCalendar (props) {

    const onPress = ({ eventIndex }) => {

        props.navigation.navigate('ProgramOverview', {activeDay: eventIndex});
    };

    return (
        <View style = {{flex: 1}}>
            <Text style = {{fontSize: 16}}>Расписание Ваших тренировок</Text>
            <Calendar
                onPress = {onPress}
                events = {props.schedule}
                />
        </View>
    )
}

export default connect (state => ({schedule: state.schedule.dates}))(MainCalendar);