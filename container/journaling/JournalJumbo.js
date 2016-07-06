import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    StyleSheet,
    ListView,
    View,
    Dimensions
    } = ReactNative;
var {height, width} = Dimensions.get('window');
import Journal from './Journal';

export default class JournalJumbo extends Component {
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.journals)
        };
    }

    componentWillReceiveProps(nextProps) {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.journals)
        });
    }

    onJournalEdit(data) {
        this.props.onJournalEdit(data);
    }

    renderRow(rowData) {
        return rowData  ? <Journal
            onJournalEdit={this.onJournalEdit.bind(this, rowData)}
            feeling={rowData.feeling}
            date={rowData.date}
            title={rowData.title}
            desc={rowData.desc}
        />
            : null;
    }

    render() {
        return (
            <View>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    horizontal={true}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: width
    },
});
