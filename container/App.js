
import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import ZSP from './ZSP';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './../reducers';

let reducer = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducer);

export default class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Provider store={store}>
                    <ZSP />
                </Provider>
            </View>
        );
    }
}