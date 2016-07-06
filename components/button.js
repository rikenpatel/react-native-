// var React = require('react');
import React, { Component } from 'react' ;
var ReactNative = require('react-native');
var {
    Text,
    TouchableHighlight,
    StyleSheet
} = ReactNative;


export default class button extends Component {
    

    render() {
        return (
          <TouchableHighlight
              style={this.props.style}
              onPress={this.props.onPress}
          >
              <Text style={styles.text} >
                  {this.props.title}
              </Text>
          </TouchableHighlight>
        );
    }

}

var styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});