import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { selectProgram } from '../actions';
import { programs } from '/data';
import BcgIMG from '../Components/BcgIMG';
import Button from '../Components/Button';

export class SelectProgram extends React.Component {

    _onPress = (programID, programName) => {
        this.props.dispatch(selectProgram(programID, programName));
        this.props.navigation.navigate('Input');
    };

    _renderItem = ({item}) => <Button
        text = {item.name}
        disabled = {!item.isActive}
        onPress = {() => this._onPress(item.id, item.name)}
        />;

    _keyExtractor = item => item.id;

    render() {
        return (
            <BcgIMG>
                <FlatList
                    data = {programs}
                    renderItem = {this._renderItem}
                    keyExtractor = {this._keyExtractor}
                    />
            </BcgIMG>
        );
    }

}


export default  connect ()(SelectProgram);