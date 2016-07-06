// var React = require('react');
import React, {Component} from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');
var SideMenu = require('react-native-side-menu');
import Menu from '../../components/side-menu';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    NativeModules: {
        ImagePickerManager
    }
} = ReactNative;
var WIN = Dimensions.get('window');
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var Format = require('../../library/date-format');
import DatePicker from '../../components/popup-datePicker';
import Button from './../../components/button';
import TextInput from './../../components/text-input';
import UserSetting from './UserSetting';
import * as userInfo from './../../actions/userInfo';
import * as menu from './../../actions/menu';

// let PHOTOS_COUNT_BY_FETCH = 1;

class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            isOpen: false
        };
    }

    getFormatDate(fmt) {
        if (this.props.userInfo.date) {
            return Format(this.props.userInfo.date, fmt);
        }

        return " ";
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });

        console.log("coming Inside");
    }

    onDismiss() {
        this.setState({visible: false});
    }

    onChange(date) {
        this.setState({
            visible: false
        });
        this.props.userInfoAction.saveUserBirthDate(date);
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    loadPage(item) {
        console.log("loadPage::item::", item);
        console.log("this.props.navigator::", this.props.navigator);
        switch(item) {
            case 'Journaling':
                this.props.navigator.push ({
                    id: item,
                    name: item
                });
                break;
        }
    }

    onMenuItemSelected(item) {
        this.setState({
            isOpen: false
        });

        this.props.menuAction.menuItemSelected(item);

        this.loadPage(item);
    }

    menuActions() {
        this.setState({isOpen: true})
    }
    
    selectPhotoTapped() {
        const options = {
            title: 'Select Profile Photo',
            takePhotoButtonTitle: 'Take Photo...',
            chooseFromLibraryButtonTitle: 'Choose from Library...',
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300,
            storageOptions: {
            skipBackup: true
            },
            allowsEditing: true
        };

        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.props.userInfoAction.saveUserAvatar(response.uri);
            }
        });
    }

    render() {
        return (
            <Navigator
                initialRoute={{
                    onLeftButtonPress: (() => this.toggle())
                }}
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar= {
                        (this.state.isOpen ? null : <Navigator.NavigationBar
                        style={styles.navBar}
                        routeMapper={NavigationBarRouteMapper}
                    /> )
                }
            />
        );
    }

    nameUpdated(event) {
        this.props.userInfoAction.nameUpdated(event.nativeEvent.text);
    }

    phoneUpdated(event) {
        this.props.userInfoAction.phoneUpdated(event.nativeEvent.text);
    }

    emailUpdated(event) {
        this.props.userInfoAction.emailUpdated(event.nativeEvent.text);
    }

    doctorVisitUpdated(event) {
        this.props.userInfoAction.doctorVisitUpdated(event.nativeEvent.text);
    }

    renderScene(route, navigator) {
        let {items, avatarSource, date, name, phone, email, doctorVisit} = this.props.userInfo;
        let {selectedItem} = this.props.menu;
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
            >
            <View style={styles.main}>

                <Image source={require('../../Images/bg-lowSize/sfp-picture-bg.png')} style={styles.backgroundImage}>
                
                    <ScrollView>
                    <View style={styles.userImageContainer}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        {avatarSource === null ? <Image source={require('../../Images/add-photo.png')} style={styles.userImage} /> : <Image style={styles.userImage} source={avatarSource} /> }
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.addPhoto}>
                        {items[1]}
                    </Text>
                    <TextInput style={styles.name} placeholder={items[2]}
                               value={name}
                               onChange={this.nameUpdated.bind(this)}>
                    </TextInput>
                    <TextInput style={styles.phone} placeholder={items[3]}
                               keyboardType="numeric"
                               value={phone}
                               onChange={this.phoneUpdated.bind(this)}>
                    </TextInput>
                    <TextInput style={styles.email} placeholder={items[4]}
                               keyboardType="email-address"
                               value={email}
                               onChange={this.emailUpdated.bind(this)}>
                    </TextInput>
                    <TextInput style={styles.email} placeholder={items[5]}
                               value={doctorVisit}
                               onChange={this.doctorVisitUpdated.bind(this)}>
                    </TextInput>
                    <Text style={styles.birthdate}>
                        {items[6]}
                    </Text>
                    <View>
                        <TouchableWithoutFeedback onPress={() => this.setState({visible: true})}>
                            <View>
                                <Text  style={styles.dateLable} delayPressOut={1}>
                                {this.getFormatDate("dd" + " / " + "MM" + " / " + "yyyy")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    </ScrollView>
                    
                    <DatePicker
                        mode="date"
                        visible={this.state.visible}
                        date={date}
                        onDismiss={this.onDismiss.bind(this)}
                        onChange={this.onChange.bind(this)}
                    />
                </Image>

            </View>
            </SideMenu>
        );
    }
}

var NavigationBarRouteMapper = {
   LeftButton(route, navigator, index, navState) {
       return (
           <TouchableOpacity style={{flex: 1}} onPress={route.onLeftButtonPress}>
               <Image source={require('../../Images/menu-icon.png')} style={styles.sideMenu} />
           </TouchableOpacity>

       );

   },
   RightButton(route, navigator, index, navState) {
       console.log('route, navigator ::> ',route, navigator);
       return (
           <TouchableOpacity style={{flex: 1}} onPress={() => navigator.parentNavigator.push({ id: 'UserSetting'})}>
                <Text style={{color: 'white', justifyContent: 'center', margin: 10, fontWeight: "bold", fontSize: 20 }}>
                    Settings
                </Text>
            </TouchableOpacity>
       )
   },
   Title(route, navigator, index, navState) {
       return (
            <Text style={{flex: 1, color: 'white', justifyContent: 'center', margin: 10, fontWeight: "bold", fontSize: 20}}>
                User Details
            </Text>
       );
   },
   gotoUserSetting() {
        this.props.navigator.push ({
            id: 'UserSetting',
            name: 'UserSetting'
        });
    }

};

var styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: WIN.width,
        height: WIN.height,
        position: 'absolute'
    },
    userImageContainer: {
        height: 150,
        width: 150,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: 80,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    addPhoto: {
        fontSize: 12,
        color: '#FFFFFF',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    name: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        marginTop: 20,
    },
    email: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        marginTop: 10
    },
    birthdate: {
        fontSize: 14,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        fontFamily: 'arial'
    },
    datePicker: {
        flexDirection: 'column',
        height: 240,
        marginLeft: 0,
        marginRight: 0
    },
    datePickerContent: {
        justifyContent: 'center'
    },
    dateLable: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        lineHeight: 28,
        color: "#FFFFFF"
    },
    phone: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        marginTop: 10
    },
    sideMenu: {
        //flex: 1,
        width: WIN.width* .12,
        height: WIN.height*.05,
        marginLeft: 12,
        marginTop: 5,
        //marginBottom: 10,
    }
});


// If we have to use ScrollView Put <ScrollView> after <Image> Tag

export default connect(state => ({
    userInfo: state.userInfo,
    menu: state.menu,
}), (dispatch) => ({
    userInfoAction: bindActionCreators(userInfo, dispatch),
    menuAction: bindActionCreators(menu, dispatch),
}))(UserInfo);
