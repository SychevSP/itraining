import React from 'react';
import { StyleSheet, Text, View, DatePickerIOS } from 'react-native';
const FONT_SIZE_TITLE = 20;

export default class BirthdaySelector extends React.Component {

    state = {
        date: new Date(1971, 0, 1),
        year: 1971,
        month: 0,
        day: 1,
    };

    setDate = date => {
        this.setState({
            date: date,
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        })
    };

    today = new Date();
    getAge = () => {
        let age = this.today.getFullYear() - this.state.year;
        if (this.today.getMonth() - this.state.month < 0) age --;
        if (this.state.month === this.today.getMonth()) {
            if (this.today.getDate() - this.state.day < 0) age --;
        }
        return age;
    };


    render () {
        return (
            <View style = {styles.main}>
                <Text style = {styles.text}>Возраст: {this.age = this.getAge()}</Text>
                <DatePickerIOS
                    date = {this.state.date}
                    mode = {'date'}
                    onDateChange = {this.setDate}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: FONT_SIZE_TITLE,
        textAlign: 'center',
    },

});