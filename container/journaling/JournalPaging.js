import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    StyleSheet,
    ListView,
    RecyclerViewBackedScrollView,
    View,
    TouchableOpacity,
    Text,
    Dimensions
    } = ReactNative;
var {height, width, fontSize} = Dimensions.get('window');
import Journal from './Journal';
import _ from 'underscore';

export default class JournalPaging extends Component {
    getSectionData(dataBlob, sectionID) {
        return dataBlob[sectionID];
    }
    getRowData(dataBlob, sectionID, rowID) {
        return dataBlob[rowID];
    }
    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionHeaderData: this.getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
        let newJournals = _.map(props.journals, journal => {
            
            var date = new Date(journal.date);
            journal.monthYear = date.toLocaleString("en-us", {month: "long"})+ ' ' + date.getFullYear();
             console.log(journal.monthYear);
        });

        newJournals = _.groupBy(newJournals, 'monthYear');
        let keys = _.keys(newJournals);
        keys.forEach((monthYear, ii) => {
            newJournals[monthYear] = _.sortBy(newJournals[monthYear], journal => journal.date);
            var sectionName = monthYear;
            sectionIDs.push(sectionName);
            dataBlob[sectionName] = newJournals[monthYear];
            rowIDs[ii] = [];
            for (var jj = 0; jj < newJournals[monthYear].length; jj++) {
                var rowName = 'S' + ii + ', R' + jj;
                rowIDs[ii].push(rowName);
                dataBlob[rowName] = newJournals[monthYear][jj];
            }
        });

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            headerPressCount: 0
        };
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.headerText}>
                    {sectionID}
                </Text>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
        var dataSource = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionHeaderData: this.getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

        });


        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
       let newJournals = _.map(nextProps.journals, journal => {

            var date = new Date(journal.date.$date);
            var feeling1 = journal.feeling;
            feeling = feeling1.toString();
            console.log(feeling);
             journal.monthYear = date.toLocaleString("en-us", {month: "long"}) + ' ' + date.getFullYear();
            return journal;
        });
        newJournals = _.groupBy(newJournals, 'monthYear');
        let keys = _.keys(newJournals);
        keys.forEach((monthYear, ii) => {
            //newJournals[monthYear] = _.sortBy(newJournals[monthYear], journal => new Date(journal.date.$date));
            var sectionName = monthYear;
            sectionIDs.push(sectionName);
            dataBlob[sectionIDs] = newJournals[monthYear];
            rowIDs[ii] = [];
            for (var jj = 0; jj < newJournals[monthYear].length; jj++) {
                var rowName = 'S' + ii + ', R' + jj;
                rowIDs[ii].push(rowName);
                dataBlob[rowName] = newJournals[monthYear][jj];
            }
        });
        this.setState({
            dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
    }

    onJournalEdit(data) {
        this.props.onJournalEdit(data);
    }

    renderRow(rowData) {
        return rowData  ? <Journal
            onJournalEdit={this.onJournalEdit.bind(this, rowData)}
            feeling={rowData.feeling}
            date={rowData.date.$date}
            title={rowData.title}
            desc={rowData.desc}
        />
            : null;
    }

    render() {
        return (
            <View>
                <ListView
                    style={[styles.container, this.props.style]}
                    dataSource={this.state.dataSource}
                    onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    initialListSize={10}
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    enableEmptySections
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        height: height * 0.68,
        marginTop: 10
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 2,
        width: width * 0.9,
        height: height * 0.05,
        backgroundColor: '#0b2034',
        opacity: 0.6
    },
    headerText: {
        fontSize: 17,
        color: '#fff'
    }
});
