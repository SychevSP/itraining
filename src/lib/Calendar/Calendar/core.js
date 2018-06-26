import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import * as utils from '../utils';
import CalendarCell from './Cell';
import CalendarRow from './Row';
import CalendarHeading from './Heading';

export default class CalendarCore extends React.Component {
    
    today = utils.getToday();

    _onPress = dateOffset => {
        const eventDate = this.calendarDays[dateOffset].date;
        const eventIndex = this.calendarDays[dateOffset].eventIndex;
        this.props.onPress ({eventDate, eventIndex});
    };

    /*
     * This function creates a 2d array of days to render in calendar
     * The days are arranged in 2d by rows and columns as they will be rendered in Calendar
     * The first day is always monday. The last day is always sunday
     * The calender renders one month plus days before and days after to achieve proper alignment
     */
    createCalendar = () => {

        const firstActiveDate = this.props.firstActiveDate; //first date of month
        const firstDate = utils.getFirstDateCal(firstActiveDate); //first date shown in calendar

        //first threshold - number of days in previous month to render
        const threshold1 = (firstActiveDate - firstDate) / utils.MS_IN_DAY;
        //number of days in this month to render
        const activeDays = utils.getDaysInMonth(firstActiveDate);

        //second threshold = number of days in previous and this month to render
        const threshold2 = threshold1 + activeDays;

        //The total number of days to render (prev + this + next)
        const rem = threshold2 % 7;
        const arrLength = rem ? threshold2 + (7 - rem) : threshold2;

        //Первый календарный день
        const date = new Date(firstDate);
        let datePres = date.getDate();
        let touchable = false;

        //Созадем массив дней календаря
        this.calendarDays = new Array(arrLength).fill(null);
        this.calendarDays.fill(null);
        this.calendarDays = this.calendarDays.map((e,i) => {
            //datePres
            if (i === threshold1 || i === threshold2) {
                datePres = 1;
            }

            //dates
            const date = firstDate + i * utils.MS_IN_DAY;

            if (this.props.touchableMode) {
                //Елси touchableMode: 'NONE' не равен 'NONE', то делаем активным с сегодняшнего дня
                touchable = !(date < this.today);
                if (this.props.touchableMode === 'INTERVAL') {
                    touchable = touchable && !(date < this.props.firstSelectableDate) && !(date > this.props.lastSelectableDate);
                }
            } else {
                //По умолчанию считаем touchableMode: 'NONE'
                touchable = false;
            }

            //Затемняем отдельные дни
            let dimmed;
            if (this.props.touchableMode === 'INTERVAL') {
                dimmed = !touchable;
            }else if (this.props.touchableMode === 'DIM_ALL') {
                dimmed = true;
            } else {
                dimmed =  date < this.today || i < threshold1 || i > threshold2;
            }

            return {
                key: i,
                dateOffset: i,
                date: date,
                datePres: datePres++,
                isToday: date === this.today,
                isWeekEnd: i % 7 > 4,
                onPress: this._onPress,
                touchable: touchable,
                dimmed: dimmed,
            }
        });


        //filter events that occur in this month
        //if there are no such events the events array will be empty
        let events = [];
        if (this.props.events && this.props.events.length) {
            events = this.props.events.map((e, i) => {
                diff = (e - firstDate)/ utils.MS_IN_DAY;
                if (diff > -1 && diff < arrLength) return {eventOffset: diff, eventIndex: i};
                return null;
            }).filter(e => e !== null);
        }

        //Highlight event dates in calendar
        if (events.length) {
            events.reduce((acc, e) => {
                //Highlight a day with event
                const dayWithEvent = acc[e.eventOffset];
                dayWithEvent.hasEvent =  true;
                dayWithEvent.eventIndex = e.eventIndex;
                dayWithEvent.touchable =  true;
                //If we are building a new training schedule make surrounding days unavailable
                //We don't want to train two days in a row
                if (this.props.touchableMode === 'INTERVAL') {
                    //make the previous day unavailable
                    if (e.eventOffset) {
                        acc[e.eventOffset - 1].touchable = false;
                        acc[e.eventOffset - 1].dimmed = true;
                    }
                    //make the next day unavailable
                    if (acc[e.eventOffset + 1]) {
                        acc[e.eventOffset + 1].touchable = false;
                        acc[e.eventOffset + 1].dimmed = true;
                    }
                }
                return acc;
            }, this.calendarDays);
        }

        /*
        if (this.props.firstSelectableDate && this.props.lastSelectableDate) {
            this.calendarDays.map(e => {

            })
        }
        */

        //Заполняем массив для рендера
        this.calendarCells = this.calendarDays.map(e => (<CalendarCell {...e}/>));

        //Разбиваем массив на ряды
        const numOfRows = arrLength / 7;
        this.calendarRows = [];
        for (var row = 0; row < numOfRows; row++) {
            this.calendarRows.push(
                <CalendarRow key={row}>
                    {this.calendarCells.slice(row * 7, row * 7 + 7)}
                </CalendarRow>
            );
        }
    };


    render() {
        this.createCalendar ();

        return (
            <View style = {{flex: 1}}>
                {CalendarHeading()}
                {this.calendarRows}
            </View>
        )
    }

}

CalendarCore.propTypes = {
    firstActiveDate: PropTypes.number,
    firstSelectableDate: PropTypes.number,
    lastSelectableDate: PropTypes.number,
    touchableMode: PropTypes.oneOf(['INTERVAL', 'DIM_ALL', 'ALL']),
    events: PropTypes.arrayOf(PropTypes.number),
    onPress: PropTypes.func,
};