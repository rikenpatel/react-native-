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
    DatePickerIOS,
    StatusBar
    } = ReactNative;
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
import * as journal from './../../actions/journal';
import JournalJumbo from './JournalJumbo';
import JournalPaging from './JournalPaging';
import ActivityList from './ActivityList';
import DatePicker from '../../components/popup-datePicker';
import _ from 'underscore';
var SearchBar = require('react-native-search-bar');

export default class JournalMain extends Component {
    constructor() {
        super();

        this.state = {
            activity: false,
            feelingFilter: false,
            dateFilter: false,
            searchMode: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.searchMode != this.state.searchMode) {
            this.setState({
                searchMode: nextProps.searchMode
            });
        }
    }

    componentWillMount() {
        this.props.journalAction.getJournals();
    }

    showActivity() {
        this.setState({
            activity: !this.state.activity
        });
    }

    showFeelingFilter() {
        this.setState({
            feelingFilter: !this.state.feelingFilter
        });
    }

    showDateFilter() {
        this.setState({
            dateFilter: true
        });
    }

    onJournalEdit(data) {
        this.props.onEdit(data);
    }

    onCreate(data) {
        this.setState({
            activity: !this.state.activity
        }, ()=>{
            this.props.onCreate(data);
        });
    }

    emotionFilterSelected(filterData) {
        this.setState({
            feelingFilter: !this.state.feelingFilter
        }, ()=>{
            this.props.journalAction.filterJournalsFeeling(filterData);
        });
    }

    onDismiss() {
        this.setState({dateFilter: false});
    }

    onChange(date) {
        console.log("date>>", date);
        this.setState({
            dateFilter: false
        }, () => {
            date && this.props.journalAction.filterJournalsDate(date);
        });
    }

    onSearchButtonPress(searchText) {
        console.log('searchText ::> ',searchText);
        this.props.journalAction.filterJournalsText(searchText);
    }

    onCancelButtonPress() {
        console.log('cancel search ::> ');
        this.props.journalAction.filterJournalsText();
    }

    render() {
        if( this.state.searchMode ) {
            return <View style={styles.container}>
            <StatusBar barStyle="light-content" />
                <View style={styles.journaling}>
                    <SearchBar
                        ref='searchBar'
                        placeholder='Search'
                        style={{height: 50, width: width, padding: 5}}
                        onSearchButtonPress={this.onSearchButtonPress.bind(this)}
                        onCancelButtonPress={this.onCancelButtonPress.bind(this)}
                    />
                </View>
                <JournalPaging
                    style={{height: height * .82}}
                    journals={this.props.journal.journals}
                    onJournalEdit={this.onJournalEdit.bind(this)}
                />
            </View>
        }

        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" />
                <View style={styles.journaling}>
                    <TouchableOpacity onPress={this.props.onCreate}>
                        <View style={styles.journalEntry}>
                            <Image source={require('../../Images/journaling/new-entry-plus-icon.png')} style={styles.newEntryImage} />
                            <Text style={styles.entrySetting}>
                                Create
                            </Text>
                            <Text style={styles.entry2Setting}>
                                New Entry
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showActivity.bind(this)}>
                        <View style={styles.activityEntry}>
                            <Image source={require('../../Images/journaling/divider-line.png')} style={styles.dividerImage} />
                            <Image source={require('../../Images/journaling/activity-entry-badge-icon.png')} style={styles.activityImage} />
                            <Text style={styles.activitySetting}>
                                From Activity
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <JournalPaging
                    style={{height: height * .70}}
                    journals={this.props.journal.journals}
                    onJournalEdit={this.onJournalEdit.bind(this)}
                />

                <DatePicker
                    mode="date"
                    visible={this.state.dateFilter}
                    date={new Date()}
                    mode="date"
                    onDismiss={this.onDismiss.bind(this)}
                    onChange={this.onChange.bind(this)}
                />

                <View style= {styles.journalingFooter}>
                    <TouchableHighlight style={styles.bottomCalendar} onPress={this.showDateFilter.bind(this)}>
                        <Image source={require('../../Images/journaling/filter-calendar-icon.png')} style={styles.footerIcon} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.bottomFeeling} onPress={this.showFeelingFilter.bind(this)}>
                        <Image source={require('../../Images/journaling/filter-feeling-icon.png')} style={styles.footerIcon} />
                    </TouchableHighlight>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.activity}
                    onRequestClose={() => {this.showActivity(false)}}
                >
                    <TouchableHighlight style={[styles.modalContainer]} onPress={this.showActivity.bind(this)}>
                        <View style={[styles.innerContainer]}>
                            <View style={{flexDirection: 'column'}}>
                                <ActivityList
                                    data={this.props.journal.activities}
                                    onCreate={this.onCreate.bind(this)}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.feelingFilter}
                    onRequestClose={() => {this.showFeelingFilter(false)}}
                >
                    <TouchableHighlight style={[styles.modalContainer]} onPress={this.showFeelingFilter.bind(this)}>
                        <View style={[styles.filterFeelingInnerContainer]}>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'column'}}>
                                    <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionFilterSelected.bind(this, '1')}>
                                        <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionFilterSelected.bind(this, '2')}>
                                        <Image source={require('../../Images/journaling/happy-entry-icon.png')} style={styles.feelingIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionFilterSelected.bind(this, '3')}>
                                        <Image source={require('../../Images/journaling/neutral-entry-icon.png')} style={styles.feelingIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionFilterSelected.bind(this, '4')}>
                                        <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionFilterSelected.bind(this, '5')}>
                                        <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: height*0.12,
        height: height - 90,
        width: width * 0.999,
        borderColor: 'yellow'
    },
    journaling: {
        flexDirection: 'row',
    },
    journalEntry: {
        backgroundColor: '#FFFFFF',
        marginLeft: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        height: height * .10,
        width: width * 0.6,
        alignSelf: 'flex-start',
    },
    newEntryImage: {
        width: width * .09,
        height: height * .05,
        marginLeft: 50,
        marginTop: 17,
        marginBottom: 15,
        marginRight: 5,
    },
    entrySetting: {
        fontSize: width * .05,
        marginLeft: 5,
        marginTop: 10,
        flexDirection: 'column',
        color: '#FF7E00',
    },
    entry2Setting: {
        fontSize: width * .05,
        marginLeft: -60,
        marginTop: 40,
        flexDirection: 'column',
        color: '#FF7E00',
    },
    activityEntry: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        height: height * .10,
        width: width * .3,
        alignSelf: 'center',
        backgroundColor: '#FFEEDE',
        //border: 5px
        borderLeftWidth: 0,
        borderLeftColor: '#FF7E00',
        //borderStyle: 'dotted' ,
    },
    activityImage: {
        width: width * .07,
        height: height * .04,
        marginLeft: 50,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 10,
    },
    activitySetting: {
        fontSize: width * .03,
        marginLeft: -60,
        marginTop: 45,
        flexDirection: 'column',
        color: '#FF7E00',
    },
    dividerImage: {
        height: height * .10,
        width: width * 0.003,
    },
    journalingFooter:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: '#ededed',
        height: height * 0.072,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
    },
    bottomFeeling: {
        alignSelf: 'flex-end',
        height: 60,
        top: -60,
        justifyContent: 'center'
    },
    bottomCalendar: {
        alignSelf: 'flex-start',
        height: 60,
        justifyContent: 'center'
    },
    footerIcon: {
        width: width * .09,
        height: height * .05,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 10
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    innerContainer: {
        width: width * 0.65,
        height: height * 0.5,
        borderRadius: 10,
        marginTop: 160,
        marginLeft: width * 0.283,
        marginRight: 10,
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    filterFeelingInnerContainer: {
        width: width * 0.19,
        borderRadius: 10,
        marginTop: height * 0.52,
        marginLeft: width * 0.80,
        marginRight: 20,
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    filterDateInnerContainer: {
        width: width,
        borderRadius: 10,
        marginTop: height * 0.85,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 5
    },
    feelingBtn: {
        padding: 5
    },
    feelingIcon: {
        height: 35,
        width: 35,
    }
});

export default connect(state => ({
    journal: state.journal,
}), (dispatch) => ({
    journalAction: bindActionCreators(journal, dispatch),
}))(JournalMain);