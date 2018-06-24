import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import * as Engine from '../utils';
import CalendarCore from './core';
import CalendarCell from './Cell';
import CalendarRow from './Row';
import CalendarHeading from './Heading';


export class Calendar extends  React.Component {

    constructor(props) {
        super(props);
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        //Запоминаем сегодняшний день
        const today  = date.getTime();
        date.setDate(1);
        this.state = {
            today: today,
            firstDateMonth: date.getTime(),
            //firstDateCalendar: getFirstDateCal (date.getTime()),
            year: date.getFullYear(),
            month: date.getMonth(),
        };
    }

    prevMonth = () => {
        const date = new Date (this.state.firstDateMonth);
        date.setDate(0);
        date.setDate(1);
        this.setState ({
            firstDateMonth: date.getTime(),
            //firstDateCalendar: getFirstDateCal(date.getTime()),
            year: date.getFullYear(),
            month: date.getMonth(),
        });
    };

    nextMonth = () => {
        const date = new Date (this.state.firstDateMonth);
        date.setDate(32);
        date.setDate(1);
        this.setState ({
            firstDateMonth: date.getTime(),
            //firstDateCalendar: getFirstDateCal(date.getTime()),
            year: date.getFullYear(),
            month: date.getMonth(),
        });
    };

    render () {

        return (
            <View style={{flex: 1, margin: 4, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{paddingLeft: 4}} onPress={this.prevMonth}>
                        <Text style={{fontSize: 20}}>{'<<<'}</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 20, color: 'green'}}>{Engine.months[this.state.month]}, {this.state.year}</Text>
                    </View>
                    <TouchableOpacity style={{paddingRight: 4}} onPress={this.nextMonth}>
                        <Text style={{fontSize: 20}}>{'>>>'}</Text>
                    </TouchableOpacity>
                </View>
                <CalendarCore
                    {...this.props}
                    firstActiveDate = {this.state.firstDateMonth}
                    />
            </View>
        );
    }
}

