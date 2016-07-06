import React, { Component } from 'react';
let ReactNative = require('react-native');

export default class TextInput extends Component {
   render() {
       return (
            <ReactNative.TextInput style={this.props.style} placeholder={this.props.placeholder} {...this.props} />
       );
   }
}