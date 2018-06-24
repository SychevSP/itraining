import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';

import {
    createPersistMiddleware,
    initiateStateAsync,
    configLib,
} from 'lib/redux-lightweight-persist';

import itraining from '/reducers';

import defaultState from './defaultState';
import persistConfig from './persistenceConfig';

//The store will be initiated after we read the data from persistent storage
export let store  = null;

export default async function initiateStore () {

    configLib ({
        asyncSave: AsyncStorage.setItem,
        asyncLoad: AsyncStorage.getItem,
        persistConfig: persistConfig
    });

    const initialState = await initiateStateAsync (defaultState);

    //The structure of the state changed from the previous version
    //Set uid to new path
    const uidDebug = await AsyncStorage.getItem('uid')
    if (uidDebug) {
        initialState.user.uid = uidDebug;
    }



    const persistMiddleware = createPersistMiddleware();
    const store = createStore (itraining, initialState, applyMiddleware(persistMiddleware));

    //If the user is not registered
    if (!initialState.user.uid)  {
        getUidFromGoogle(store.dispatch)
    }

    return store;
}

