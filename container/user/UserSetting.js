import React, { Component } from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');

var {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    Navigator,
    ScrollView,
    TouchableHighlight,
    DatePickerIOS,
    CameraRoll,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    Dimensions,
    DeviceEventEmitter,
    Switch,
    NativeModules: {
        ImagePickerManager
        }
    } = ReactNative;
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');

export default class UserSetting extends Component {
    render() {
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={this.props.navigator}
                navigationBar={ 
                    <Navigator.NavigationBar
                        style={{backgroundColor: 'transparent'}}
                        routeMapper={NavigationBarRouteMapper}

                    /> 
                }
            />
        );
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex: 1}}>
            
                <Image source={require('../../Images/bg-lowSize/sfp-picture-bg.png')} style={styles.backgroundImage}>
                <ScrollView>
            {/* FACEBOOK  */}
                        <View style={styles.socialSetting1}>
                            <Image source={require('../../Images/facebook-icon.png')} style={styles.iconImage} />
                            <Text style={styles.fbSetting}>
                                Facebook Posts
                            </Text>
                            <Switch
                                style={styles.switchStyle}
                                />
                        </View>
            {/* TWITTER  */}
                        <View style={styles.socialSetting2}>    
                            <Image source={require('../../Images/twitter-icon.png')} style={styles.iconImage} />           
                            <Text style={styles.twSetting} >
                              Twitter Feeds
                            </Text>
                            <Switch
                              style={styles.switchStyle}
                               />
                        </View>
            {/* LOCATION  */}
                        <Text style={styles.infoText} >
                            We will never post on social media without your permision.
                        </Text>
                                    
                        <View style={styles.socialSetting3}>
                            <Image source={require('../../Images/location-icon.png')} style={styles.iconImage} />
                            <Text style={styles.locSetting}>
                                Location
                            </Text>
                            <Switch
                                style={styles.switchStyle}
                                />
                        </View>
                       <Text style={styles.infoText} >
                            Turning on your location will help me give you suggestions.
                        </Text>
            {/* PUSH NOTIFICATION  */}
                        <View style={styles.socialSetting3}>
                            <Image source={require('../../Images/push-not-icon.png')} style={styles.iconImage} />
                            <Text style={styles.locSetting}>
                                Push Notifications
                            </Text>
                            <Switch
                              style={styles.switchStyle}
                               />
                        </View>
                       <Text style={styles.infoText} >
                            Can I send you notes and reminders?
                        </Text>
            {/* TOUCH ID  */}
                        <View style={styles.socialSetting3}>
                            <Image source={require('../../Images/touch-id-icon.png')} style={styles.iconImage} />
                            <Text style={styles.locSetting}>
                                Touch ID
                            </Text>
                            <Switch
                              style={styles.switchStyle}
                               />
                        </View>
                     </ScrollView>      
                </Image>
            </View>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() => navigator.parentNavigator.pop()}
            >
                <View style={styles.backView}>
                <Icon
                    name='ion|ios-arrow-back'
                    size={30}
                    color='#FFFFFF'
                    style={styles.sideMenu}

                />
                <Text style={styles.backText}>Back</Text>
                </View>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return (
            <Text style={styles.navSettingText}>
                Settings
            </Text>
        );
    }
};


var styles = StyleSheet.create({
    backView:{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        marginLeft: 0
    },
    navSettingText:{
        flex: 1,
        color: 'white',
        justifyContent: 'center',
        margin: 10,
        fontWeight: "bold",
        fontSize: WIN.width * .05
    },
    sideMenu: {
        width: 30,
        height: 20,
        marginLeft: 0
    },
    backText: {
        color: '#FFFFFF',
        fontWeight: "bold",
        marginLeft: 0,
        fontSize: WIN.width * .05
    },
    backgroundImage: {
        flex: 1,
        width: WIN.width,
        height: WIN.height,
        position: 'absolute'
    },
    socialSetting1: {
        backgroundColor: '#FFFFFF',
        marginTop: WIN.height*.17,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        height: height * .09,
        width: width * .8,
        alignSelf: 'center',
    },
    socialSetting2: {
        backgroundColor: '#FFFFFF',
        marginLeft: 30,
        marginRight: 30,
        marginTop: WIN.height*.001,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        height: height * .09,
        width: width * .8,
        alignSelf: 'center',
    },
    socialSetting3: {
        backgroundColor: '#FFFFFF',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        borderRadius: 10,
        flexDirection: 'row',
        height: height * .09,
        width: width * .8,
        alignSelf: 'center',
    },
    fbSetting: {
        fontSize: WIN.width * .05,
        marginLeft: 5,
        marginTop: 17,
        flexDirection: 'column'
    },
    twSetting: {
        fontSize: WIN.width * .05,
        marginLeft: 5,
        marginTop: 17,
        flexDirection: 'column'
    },
    locSetting: {
        fontSize: WIN.width * .05,
        marginLeft: 5,
        marginTop: 17,
        flexDirection: 'column',
        //fontFamily: 'Lato'
    },
    infoText: {
        fontSize: WIN.width * .033,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 15,
        //fontFamily: 'Lato-Regular'
    },
    iconImage: {
        width: width * .09,
        height: height * .05,
        marginLeft: 15,
        marginTop: 12,
        marginBottom: 15,
        marginRight: 10
    },
    switchStyle: {
        marginTop: WIN.height*.02,
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'flex-end',
        left: WIN.width*.6,
        justifyContent: 'space-around',
    }
});