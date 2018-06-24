import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import initiateStore from './src/store';
import initiateNavigator from './src/Navigator';

//This variables will be initiated after the data is uploaded from persistent storage
let store = null;
let RootNavigator = null;

export default class App extends React.Component {

    state = {isLoaded: false};

    onFinishLoading = () => {
        this.setState ({isLoaded: true});
    };

    componentDidMount () {

        console.disableYellowBox = true;
        initiateApp(this.onFinishLoading);
    }

    render() {
        if (this.state.isLoaded) {
            return (<Provider store={store}><RootNavigator/></Provider>);
        } else {
            return (<Text>Loading...</Text>)
        }

  }
}




async function initiateApp (onFinishLoading) {
    //upload state from persistent storage
    store = await initiateStore();
    //create navigator with initial route dependent on the state
    RootNavigator = initiateNavigator(store.getState());
    //The app is initiated. Callback to render the app instead of splash screen
    onFinishLoading();
}


