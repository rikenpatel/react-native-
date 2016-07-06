import React, {Component} from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');
var SideMenu = require('react-native-side-menu');
import Menu from '../../components/side-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    StatusBar
    } = ReactNative;
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');
import Button from './../../components/button';
import TextInput from './../../components/text-input';
//import UserSetting from './UserSetting';

export default class journalingEntry extends Component {
    constructor() {
        super();
        this.state = {
            names: ["Title","Date", "Tell me something..."]
        };
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

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected(item) {
        this.setState({
            isOpen: false
        });

        this.props.menuAction.menuItemSelected(item);
    }

    menuActions() {
        this.setState({isOpen: true})
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

    renderScene(route, navigator) {
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} />;
        return (
               
                <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
                style = {styles.sideMenu}
            >

            <View style={styles.main}>    
            <StatusBar barStyle="default" />
            <KeyboardAwareScrollView>  
              <ScrollView> 
              <View style={{flex: 8}}>       
                  <Image source={require('../../Images/journaling/divider-line-h-e.png')} style={styles.dividerhImage} /> 
                  <TextInput style={styles.titleTextEntry} placeholder={this.state.names[0]}
                  multiline={true}
                  autoFocus = {true}>
                  </TextInput>
                  <Text style={styles.dateText}>
                        2 June 2016
                  </Text>
                  <Image source={require('../../Images/journaling/divider-line-h-e.png')} style={styles.dividerh2Image} /> 
                  <TextInput style={styles.journalTextEntry} placeholder={this.state.names[2]}
                  multiline={true}
                  >
                  </TextInput>
        </View>
    </ScrollView>
        </KeyboardAwareScrollView>

     <View style= {styles.journalingFooter}>
          <TouchableHighlight style={styles.bottomPhoto}>
                  <Image source={require('../../Images/journaling/add-photo-icon.png')} style={styles.photoIcon} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomPhoto}>
              <Image source={require('../../Images/journaling/delete-icon.png')} style={styles.deleteIcon} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomPhoto}>
              <Image source={require('../../Images/journaling/duplicate-icon.png')} style={styles.duplicateIcon} />
          </TouchableHighlight>
        </View> 

</View>

</SideMenu>
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
                    <Image source={require('../../Images/journaling/back.png')} style={styles.backImage}  />

                </View>
            </TouchableOpacity>

       );

   },
   RightButton(route, navigator, index, navState) {
       console.log('route, navigator ::> ',route, navigator);
       return (
          <TouchableOpacity style={{flex: 1}} onPress={() => navigator.parentNavigator.push({ id: 'JournalingLanding'})}>
               <Image source={require('../../Images/journaling/done-icon.png')} style={styles.searchIcon} />
            </TouchableOpacity>
      )
   },
   Title(route, navigator, index, navState) {
       return null;
   }
};


var styles = StyleSheet.create({
  main: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    },
    backView:{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 0,
        marginLeft: 0,
    },
    backImage: {
        marginLeft: WIN.height *.02,
        marginTop: WIN.height *.02,
        //right: 10,
        width: width * .20,
        height: height * .04,
  },
  backgroundImage: {
        flex: 1,
        width: WIN.width,
        height: WIN.height,
        position: 'absolute',
  },
  journaling: {
    flexDirection: 'row',
    marginTop: 10
  },
  journalMain: {
    flex: 8,
  },
  journalingFooter:{
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    height:70,
    alignItems:'center',
  },
  dividerImage: {
    height: height * .10,
    width: width * 0.003,
  },
  dividerh2Image: {
      height: height * .0015,
      width: width,
      alignSelf: 'center',
      marginTop: height * .02,
      marginBottom: 5
  },
  titleTextEntry: {
        padding: 0,
        backgroundColor: '#FFFFFF',
        width: width * .9,
        height: height * .1,
        fontSize: 20,
        color: '#000000',
        marginTop: 0,
        alignSelf: 'center'
  },
  journalTextEntry: {
        padding: 0,
        backgroundColor: '#FFFFFF',
        width: width * .9,
        height: height * .3,
        fontSize: 18,
        color: '#000000',
        marginTop: 0,
        alignSelf: 'center',
        textAlign: 'auto'
  },
    journalEntry: {
        backgroundColor: '#FFFFFF',
        marginTop: WIN.height*.10,
        marginLeft: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        height: height * .10,
        width: width * 0.6,
        alignSelf: 'flex-start',
    },
    activityEntry: {
        marginTop: WIN.height*.10,
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
    newEntryImage: {
        width: width * .09,
        height: height * .05,
        marginLeft: 55,
        marginTop: 17,
        marginBottom: 15,
        marginRight: 5,
    },
    entrySetting: {
      fontSize: WIN.width * .05,
        marginLeft: 0,
        marginTop: 10,
        flexDirection: 'column',
        color: '#FF7E00',
    },
    entry2Setting: {
      fontSize: WIN.width * .05,
        marginLeft: -60,
        marginTop: 40,
        flexDirection: 'column',
        color: '#FF7E00',
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
      fontSize: WIN.width * .03,
        marginLeft: -60,
        marginTop: 45,
        flexDirection: 'column',
        color: '#FF7E00',
    },
    journalEntryFeed: {
        backgroundColor: '#FFFFFF',
        marginTop: WIN.height*.03,
        borderRadius: 10,
        flexDirection: 'column',
        height: height * .20,
        width: width * .9,
        alignSelf: 'center',
    },
    journalEntryFeedWithTitle: {
        backgroundColor: '#FFFFFF',
        marginTop: WIN.height*.03,
        borderRadius: 10,
        flexDirection: 'column',
        height: height * .25,
        width: width * .9,
        alignSelf: 'center',
    },
    journalHeading: {
      flexDirection: 'row'
    },
    dateText: {
      width: width*.9,
      marginTop: 5,
      color: '#FF7E00',
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    feelingIcon: {
        width: width * .07,
        height: height * .04,
        position: 'absolute',
        left: WIN.width*.78,
        marginTop: 3,
        alignSelf: 'flex-end',
    },
    dividerhImage: {
      height: height * .0015,
      width: width,
      alignSelf: 'center',
      marginTop: height * .12,
      marginBottom: 5
    },
    jornalTitle: {
      marginLeft: 20,
      marginRight: 20
    },
    titleText: {
      fontWeight: "300",
      fontSize : 25,
      position: 'relative',
      backgroundColor: 'transparent'
    },
    journalDesc: {
      marginLeft: 20,
      marginRight: 20
    },
    descText: {
      fontWeight: "300",
      fontSize : 17,
      position: 'relative',
      backgroundColor: 'transparent'
    },
    monthDividerImage: {
      height: height * .05,
      width: width * 0.9,
      alignSelf: 'center',
      marginTop: WIN.height*.03,
    },
    photoIcon: {
      width: width * .10,
      height: height * .042,
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 10,
    },
    deleteIcon: {
      width: width * .05,
      height: height * .04,
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 10,
        left: width *.45
    },
    duplicateIcon: {
      width: width * .08,
      height: height * .045,
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 10,
        left: width *.52
    },
    bottomFeeling: {
        left: WIN.width*.65,
    },
    bottomCalendar: {

    },
    sideMenu: {
        //flex: 1,
        width: WIN.width* .12,
        height: WIN.height*.05,
        marginLeft: 12,
        marginTop: 5,
        //marginBottom: 10,
    },
    navBar: {
        position: 'absolute',
        //flex:0.1,
        left: 0,
        right: 0,
        top: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        height:70,
        alignItems:'center',
    },
    searchIcon: {
        width: width * .12,
        height: height * .045,
        right: 2,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 5
    }
});
