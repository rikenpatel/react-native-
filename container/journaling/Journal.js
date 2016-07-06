import React, { Component } from 'react';
var ReactNative = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
    } = ReactNative;
var {height, width, fontSize} = Dimensions.get('window');

export default class Journal extends Component {
    getEmoImage(emotion) {
        switch(emotion) {
            case '1':
                return <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
            case '2':
                return <Image source={require('../../Images/journaling/happy-entry-icon.png')} style={styles.feelingIcon} />
            case '3':
                return <Image source={require('../../Images/journaling/neutral-entry-icon.png')} style={styles.feelingIcon} />
            case '4':
                return <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
            case '5':
                return <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
            default:
                return <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onJournalEdit}>
                    <View style={styles.journalEntryFeedWithTitle}>
                        <View style={styles.journalHeading}>
                            <Text style={styles.dateText}>
                            {new Date(this.props.date).getDate() + ' ' + new Date(this.props.date).toLocaleString("en-us", { month: "long" }) + ' ' + new Date(this.props.date).getFullYear()}
               {//                 {this.props.date.getDate() + ' ' + this.props.date.toLocaleString("en-us", { month: "long" }) + ' ' + this.props.date.getFullYear()}
                           }
                            </Text>
                            {this.getEmoImage(this.props.feeling)}
                        </View>
                        <View source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        {
                            this.props.title &&
                            <View style={styles.journalTitle}>
                                <Text style={styles.titleText}>
                                    {this.props.title}
                                </Text>
                            </View>
                        }
                        <View style={styles.journalDesc}>
                            <Text style={styles.descText} numberOfLines={3}>
                                {this.props.desc}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        margin: 20,
        marginBottom: 10,
        marginTop: 10
    },
    journalEntryFeedWithTitle: {
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'column',
        height: height * 0.18,
        width: width * .9,
        alignSelf: 'center',
    },
    journalEntryFeed: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'column',
        height: height * .20,
        width: width * .9,
        alignSelf: 'center',
    },
    journalHeading: {
        flexDirection: 'row'
    },
    dateText: {
        marginLeft: 20,
        marginTop: 5,
        color: '#FF7E00',
        fontWeight: 'bold'
    },
    feelingIcon: {
        width: 25,
        height: 25,
        position: 'absolute',
        left: width*.78,
        marginTop: 0,
        alignSelf: 'flex-end',
    },
    dividerhImage: {
        height: 1,
        width: width * 0.8,
        marginTop: 8,
        marginBottom: 0,
        borderWidth: 0.5,
        borderColor: '#9B9B9B',
        alignSelf: 'center',
        left: 5
    },
    journalTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    titleText: {
        fontWeight: "300",
        fontSize : width * 0.05,
        position: 'relative',
        backgroundColor: 'transparent'
    },
    journalDesc: {
        marginLeft: 20,
        marginRight: 20
    },
    descText: {
        fontWeight: "300",
        fontSize : width * 0.035,
        position: 'relative',
        backgroundColor: 'transparent'
    },
});