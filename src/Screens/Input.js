import React from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';

import { inputFinished } from '/actions'
import Button from '/Components/Button';
import BcgIMG from '/Components/BcgIMG';
import { getExercisesForInput } from '/lib/programCalculator';

class Input extends React.Component {

    constructor (props) {
        super (props);
        this.input = [];
        this.exercises = getExercisesForInput(this.props.programID);
        this.exercises.map((e) => this.input[e.id] = 100)
    }


    onSubmit = (input, id) => {
        this.input[id] = input;
    };

    onPress = () => {
        //Проверяем, что все заполнено
        //console.log(this.input);
        if (this.input.filter(e => (e === null) || (e === 0)).length) {
            Alert.alert('Не все поля заполнены');
            return
        }
        //данные пользователя
        this.props.dispatch(
            inputFinished({input: this.input})
        );

        //Переходим на следующий экран
        this.props.navigation.navigate('Schedule');
    };


    _renderItem = ({ item }) => {
        return (
            <InputForm
                id = {item.id}
                exerciseName = {item.name}
                onSubmit = {this.onSubmit}
                />
    )};


    render () {
        return (
            <BcgIMG>
            <KeyboardAvoidingView style = {{flex: 1, marginLeft: '5%', marginRight: '5%'}} behavior = 'padding'>
                <View style = {{flex: -1}}>
                    <Text>С каким максимальным весом вы можете сделать перечисленные упражнения?</Text>
                </View>
                <View style = {{flex: 10}}>
                <FlatList
                    data = {this.exercises}
                    renderItem = {this._renderItem}
                    />
                </View>
                <Button onPress = {() => this.onPress()} text = 'Далее'/>
            </KeyboardAvoidingView>
            </BcgIMG>

        );
    }

}

function InputForm (props) {
    return (
        <View>
            <Text style = {{fontSize: 14}}>{props.exerciseName}</Text>
            <TextInput
                style = {{fontSize: 14, alignSelf: 'stretch'}}
                multiline = {false}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                defaultValue = { '100' }
                onEndEditing = {(e) => {props.onSubmit(e.nativeEvent.text, props.id)}}
                />
        </View>

    );
}


export default connect(state => ({programID: state.program.id}))(Input);

