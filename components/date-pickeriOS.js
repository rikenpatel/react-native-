// var React = require('react');
import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    DatePickerIOS,
    StyleSheet
}  = ReactNative;

export default class DatePickeriOS extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date()
        };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.date && nextProps.date != this.state.date) {
            this.setState({
                date: nextProps.date
            });
        }
    }
    onDateChange(date) {
        this.setState({
            date: date
        });
        this.props.onDateChange && this.props.onDateChange(date);
    }
    render() {
        let props = this.props;
        return (
            <DatePickerIOS
                style={styles.datePicker}
                date={this.state.date}
                mode={props.mode}
                onDateChange={this.onDateChange.bind(this)}
                minimumDate={props.minDate}
                maximumDate={props.maxDate}
                minuteInterval={props.minuteInterval}
                timeZoneOffsetInMinutes={props.timeZoneOffsetInMinutes}
            />
        );
    }
}

var styles = StyleSheet.create({
    datePicker :{
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
});
