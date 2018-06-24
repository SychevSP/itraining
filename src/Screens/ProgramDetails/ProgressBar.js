import React from 'react';
import { View } from 'react-native';

class ProgressBar extends React.Component {

    render () {

        const progressBar = [];
        for (let i = 0; i < this.props.length; i++) {
            progressBar.push(<ProgressCell key = {i} isComplete ={this.props.index > i}/>);
        }

        return (
            <View style={{flex: 1, justifyContent: 'space-around'}}>
                {progressBar}
            </View>
        );
    }
}

function ProgressCell (props) {
    const bckgColor = props.isComplete ? 'green' : 'red';
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flex: 1, backgroundColor: bckgColor}}/>
            <View style={{flex: 1, backgroundColor: bckgColor, width: 10}}/>
        </View>
    );
}
