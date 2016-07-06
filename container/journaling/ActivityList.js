
import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    Modal,
    ListView
    } = ReactNative;
import _ from 'underscore';

export default class ActivityList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.data),
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data != this.state.data) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.data),
            });
        }
    }

    renderRow(activity) {
        return <TouchableOpacity style={styles.activityBtn} onPress={this.props.onCreate.bind(this, activity)} key={activity.title}>
            <Text style={styles.titleText}>{activity.title}</Text>
        </TouchableOpacity>;

    }

    renderSeperator() {
        return (
            <View
                style={{height: 1, backgroundColor: '#CCCCCC'}}
            />
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={this.renderSeperator}
            />
        );
    }
}

var styles = StyleSheet.create({
    activityBtn: {

    },
    titleText: {
        fontSize: 18,
        padding: 7
    },
});
