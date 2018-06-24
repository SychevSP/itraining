import React from 'react';
import { Text, View, Slider } from 'react-native';

export default class SliderView extends React.Component {

    state = {sliderValue: 0};

    onValueChange = (val) => {
        this.setState ({sliderValue: val});
    };

    render () {
        return (
            <View style = {{flex: 1, justifyContent: 'center'}}>
                <Slider
                    minimumValue = {0}
                    maximumValue = {parseInt(this.props.maxVal, 10)}
                    step = {1}
                    onValueChange = {this.onValueChange}
                    />
                <Text style = {{fontSize: 15}}>Выполнено повторений {this.state.sliderValue} из {this.props.maxVal}</Text>
            </View>
        );
    }


}
