import { StackNavigator, NavigationActions } from 'react-navigation';

import navPaths from './navPaths';


export default function AppNavigator (state) {
    const initialRouteName = setInitialRoute (state);
    return StackNavigator(navPaths, {initialRouteName});
}

const setInitialRoute = state => {

    if (state.program.isActive) {
        return 'MainNavigator';
    }

    /*
    if (state.program.input !== null) {
        return 'Schedule';
    }

    if (state.program.id !== null) {
        return 'Input';
    }

    if (state.profile.isComplete) {
        return 'SelectProgram';
    }
    */

    return 'Profile';
}

