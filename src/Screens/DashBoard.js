import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from 'Components/Button';
import { resetAll } from '/actions';

function DashBoard (props) {

    const reset = () => {
        const resetNav = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Profile' }),
            ]
        });
        props.navigation.dispatch(resetNav);
        props.dispatch(resetAll());

    };

        return (
            <View style = {{flex: 1, paddingTop: 4}}>
                <View style ={{borderRadius: 4, backgroundColor: 'beige', margin: 3}}>
                    <Text style = {{fontSize: 16}}>Статус:</Text>
                    <Text style = {{fontSize: 16}}>{`Закончено тренировок ${props.progress.day} из ${props.routine.length}`}</Text>
                    <Text style = {{fontSize: 16}}>{Math.round(props.progress.day/props.routine.length*100)+'%'}</Text>
                </View>
                <Button onPress = {reset} text = 'reset'/>
            </View>
        );

}

export default connect (state => ({progress: state.program.progress, routine: state.program.routine}))(DashBoard);

