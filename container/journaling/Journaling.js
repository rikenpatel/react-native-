
import React, { Component } from 'react';
var ReactNative = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    Image,
    Navigator,
    TouchableOpacity,
    Dimensions,
    Modal
    } = ReactNative;
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
import * as journal from './../../actions/journal';
import JournalMain from './JournalMain';
import NewJournal from './NewJournal';

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        switch(route.id) {
            case 'NewJournal':
                return <TouchableOpacity style={styles.sideButtons} onPress={() => { navigator.props.onBack() }}>
                    <Image source={require('../../Images/journaling/back.png')} style={styles.backButton} />
                    
                </TouchableOpacity>;
            case 'JournalingMain':
            default:
                return <TouchableOpacity style={styles.sideButtons} onPress={() => { navigator.props.updateMenuState(); }}>
                    <Image source={require('../../Images/menu-icon.png')} style={styles.sideMenu} />
                </TouchableOpacity>;

            case 'EditJournal':
                return <TouchableOpacity style={styles.sideButtons} onPress={() => { navigator.props.onBack() }}>
                    <Image source={require('../../Images/journaling/back.png')} style={styles.backButton} />
                </TouchableOpacity>;
        }
    },
    RightButton(route, navigator, index, navState) {
        switch(route.id) {
            case 'NewJournal':
                return <TouchableOpacity onPress={() => { navigator.props.collectNewEntryEmotion() }} style={styles.sideButtons}>
                        <Image source={require('../../Images/journaling/done-icon.png')} style={styles.sideSearch} />
                    </TouchableOpacity>;
            case 'EditJournal':
                return <TouchableOpacity onPress={() => { navigator.props.collectNewEntryEmotion() }} style={styles.sideButtons}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>;
            case 'JournalingMain':
            default:
                return <TouchableOpacity onPress={() => { navigator.props.searchMode() }} style={styles.sideButtons}>
                    <Image source={require('../../Images/journaling/search-icon.png')} style={styles.sideSearch} />
                </TouchableOpacity>;
        }
    },
    Title(route, navigator, index, navState) {
        let title = route.id === 'JournalingMain' ? 'Journaling' : '';
        return (
            <Text style={{flex: 1, color: 'white', justifyContent: 'center', margin: 10, fontSize: 20}}>
                {title}
            </Text>
        );
    }
};


class Journaling extends Component {
    constructor() {
        super();

        this.state = {
            getEmotionForNewEntry: false,
            searchMode: false
        };
    }

    onCopy(data) {
        this.navigator.replace({
            id: 'NewJournal',
            data: data
        });
    }

    onCreate(data) {
        this.navigator.push({
            id: 'NewJournal',
            data: data
        });
    }

    onEdit(data) {
        this.navigator.push({
            id: 'EditJournal',
            data: data
        });
    }

    onBack() {
        this.navigator.pop();
    }

    collectNewEntryEmotion() {
        this.setState({
            getEmotionForNewEntry: true
        });
    }

    addNewEntryDone() {
        this.setState({
            getEmotionForNewEntry: false
        });
    }

    searchMode() {
        this.setState({
            searchMode: true
        });
    }

    getScreen(route) {
        var routeId = route.id;
        let {getEmotionForNewEntry} = this.state;
        switch(routeId) {
            case 'NewJournal':
                return <NewJournal
                    getEmotionForNewEntry={getEmotionForNewEntry}
                    addNewEntryDone={this.addNewEntryDone.bind(this)}
                    onCopy={this.onCopy.bind(this)}
                    data={route.data}
                    onBack={this.onBack.bind(this)}
                />;
            case 'EditJournal':
                return <NewJournal
                    getEmotionForNewEntry={getEmotionForNewEntry}
                    addNewEntryDone={this.addNewEntryDone.bind(this)}
                    onCopy={this.onCopy.bind(this)}
                    data={route.data}
                    onBack={this.onBack.bind(this)}
                />;
            case 'JournalingMain':
            default:
                return <JournalMain style={{flex: 1}}
                                    searchMode={this.state.searchMode}
                                    onCreate={this.onCreate.bind(this)}
                                    onEdit={this.onEdit.bind(this)}
                />;
        }
    }

    renderScene(route, navigator) {
        this.navigator = navigator;

        var routeId = route.id;
        switch(routeId) {
            case 'NewJournal':
                    return (
                            <View style={{backgroundColor: 'white'}}>
                                    {this.getScreen(route)}
                            </View>
                        ); 
            case 'EditJournal':
                    return (
                            <View style={{backgroundColor: 'white'}}>
                                    {this.getScreen(route)}
                            </View>
                        ); 
            case 'JournalingMain':
            default:
                    return (
                            <View>
                                <Image source={require('../../Images/bg-lowSize/sfp-picture-bg.png')} style={styles.backgroundImage}>
                                    {this.getScreen(route)}
                                </Image>
                            </View>
                        );
        }

        
    }

    updateMenuState() {
        console.log('called ::> ');
        this.props.updateMenuState();
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'JournalingMain'}}
                renderScene={this.renderScene.bind(this)}
                updateMenuState={this.updateMenuState.bind(this)}
                collectNewEntryEmotion={this.collectNewEntryEmotion.bind(this)}
                searchMode={this.searchMode.bind(this)}
                onBack={this.onBack.bind(this)}
                navigationBar= {
                        <Navigator.NavigationBar
                        style={styles.navBar}
                        routeMapper={NavigationBarRouteMapper}
                        />
                }
            />
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height,
    },
    sideButtons: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    sideMenu: {
        width: 47,
        height: 35,
    },
    backButton: {
        marginLeft: height *.01,
        marginTop: height *.01,
        width: width * .20,
        height: height * .04,
    },
    sideSearch: {
        width: 35,
        height: 35,
    },
    editText: {
        fontSize: 17,
        color: 'orange',
        fontWeight: '500'
    }
});

export default connect(state => ({
}), (dispatch) => ({
    journalAction: bindActionCreators(journal, dispatch),
}))(Journaling);