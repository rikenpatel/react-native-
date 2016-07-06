// var React = require('react');
import React, { Component } from 'react';
var ReactNative = require('react-native');
import Modal from 'rn-modal';
var {
    PropTypes,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} = ReactNative;
import DatePickeriOS from './date-pickeriOS';

export default class PopupDatePicker extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillReceiveProps({visible}) {
        if (this.props.visible != visible) {
            this.props.onPickerChange && this.props.onPickerChange(visible);
        }
    }
    onChange() {
        this.props.onChange && this.props.onChange(this.state.date);
    }
    onPickerChange(date) {
        this.setState({date});
        this.props.onPickerChange && this.props.onPickerChange(date);
    }
    onDismiss() {
        if (this.props.visible) {
            this.props.onDismiss && this.props.onDismiss();
        }
    }
    render() {
        let state = this.state;
        let props = this.props;
        let customStyle = StyleSheet.create(props.styles);
        return (
            <Modal visible={props.visible} onDismiss={this.onDismiss.bind(this)} animated={true}>
                <View style={[styles.container, customStyle.container]}>
                    <View style={[styles.toolbar, customStyle.toolbar]}>
                        <TouchableOpacity style={[styles.button, customStyle.button]} activeOpacity={1} onPress={()=>this.onDismiss()}>
                            <Text style={[styles.buttonText1, customStyle.buttonText1]}>{props.dismissText || 'Dismiss'}</Text>
                        </TouchableOpacity>
                        <View style={{flex: .3}}/>
                        <TouchableOpacity style={[styles.button, customStyle.button]} activeOpacity={1} onPress={()=>this.onChange()}>
                            <Text style={[styles.buttonText2, customStyle.buttonText2]}>{props.okText || 'Ok'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 0, alignSelf: 'center'}}>
                        <DatePickeriOS
                            style={props.style}
                            defaultDate={props.defaultDate}
                            date={state.date}
                            mode={props.mode}
                            onDateChange={this.onPickerChange.bind(this)}
                            minDate={props.minDate}
                            maxDate={props.maxDate}
                            minuteInterval={props.minuteInterval}
                            timeZoneOffsetInMinutes={props.timeZoneOffsetInMinutes} />
                    </View>
                </View>
            </Modal>
        );
    }
}

PopupDatePicker.propTypes = {
    visible: React.PropTypes.bool,
    onText: React.PropTypes.string,
    dismissText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onPickerChange: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onVisibleChange: React.PropTypes.func,
    styles: React.PropTypes.object
};

var styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        height: 240,
        borderRadius: 10
    },
    toolbar: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        flexDirection: 'row'
    },
    button: {
        height: 40,
        justifyContent: 'center',
        borderRadius: 3
    },
    buttonText1: {
        color: '#0ae',
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 15
    },
    buttonText2: {
        color: '#0ae',
        fontSize: 16,
        textAlign: 'right',
        marginRight: 18
    }
});