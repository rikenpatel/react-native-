import React, {Component} from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');
var SideMenu = require('react-native-side-menu');
import Menu from '../../components/side-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Panel from '../../components/panel';

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
    StatusBar,
    AppRegistry
    } = ReactNative;
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');
import Button from './../../components/button';
import TextInput from './../../components/text-input';
//import UserSetting from './UserSetting';

export default class MyFeelings extends Component {
    constructor() {
        super();
        this.state = {
            names: ["Title","Date", "Tell me something..."]
            //image: ["../../Images/safetyplan/very-happy.png"]
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
            >

            <View style={styles.main}>    
            <StatusBar barStyle="default" />

             <Image source={require('../../Images/safetyplan/bg.png')} style={styles.backgroundImage}>
                
                    <Text style={styles.titleText}> Right now I'm feeling... </Text> 
                <ScrollView style={styles.container}>
                
                       
                       <View style={styles.veryHappyCollapse}>
                            <Panel
                                 title={
                                      <Image source={require('../../Images/safetyplan/very-happy.png')} style={{width: 40, height: 40}} />
                                  }>
                                <Text>
                                    I am able to go out and do things socially. I am able to offer support to others.
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#ff6900'}]}>
                                            <Text style={styles.smallButtons}>Journlaing</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#ff6900'}]}>
                                              <Text style={styles.smallButtons}>Hope Box</Text>
                                      </TouchableOpacity>
                                  </View>
                        </Panel>
                    </View>

                    <View style={styles.happyCollapse}>
                            <Panel
                                 title={
                                      <Image source={require('../../Images/safetyplan/happy.png')} style={{width: 40, height: 40}} />
                                  }>
                                <Text>
                                    I start conversations with others and enjoy chatting with them. I want to go out more. My sense of humour and personality improves.
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#ff9d43'}]}>
                                            <Text style={styles.smallButtons}>Journlaing</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#ff9d43'}]}>
                                              <Text style={styles.smallButtons}>Hope Box</Text>
                                      </TouchableOpacity>
                                  </View>
                        </Panel>
                    </View>

                    <View style={styles.neutralCollapse}>
                            <Panel
                                 title={
                                      <Image source={require('../../Images/safetyplan/neutral.png')} style={{width: 40, height: 40}} />
                                  }>
                                <Text>
                                    I just kind of live day to day and don’t look to much into the future but I can manage what I have to deal with on a daily basis.
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#9B9B9B'}]}>
                                            <Text style={styles.smallButtons}>Journlaing</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#9B9B9B'}]}>
                                              <Text style={styles.smallButtons}>Hope Box</Text>
                                      </TouchableOpacity>
                                  </View>
                        </Panel>
                    </View>


                    <View style={styles.sadCollapse}>
                            <Panel
                                 title={
                                      <Image source={require('../../Images/safetyplan/sad.png')} style={{width: 40, height: 40}} />
                                  }>
                                <Text>
                                    I isolate myself from other and I feel like I snap at people all of the time because I don’t want them close to me.
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#84A4C7'}]}>
                                            <Text style={styles.smallButtons}>Journlaing</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#84A4C7'}]}>
                                              <Text style={styles.smallButtons}>Hope Box</Text>
                                      </TouchableOpacity>
                                  </View>
                        </Panel>
                    </View>


                    <View style={styles.verySadCollapse}>
                            <Panel
                                 title={
                                      <Image source={require('../../Images/safetyplan/very-sad.png')} style={{width: 40, height: 40}} />
                                  }>
                                <Text>
                                    I am able to go out and do things socially. I am able to offer support to others.
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#5A9BE7'}]}>
                                            <Text style={styles.smallButtons}>Journlaing</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.happyIcon,{backgroundColor: '#5A9BE7'}]}>
                                              <Text style={styles.smallButtons}>Hope Box</Text>
                                      </TouchableOpacity>
                                  </View>
                        </Panel>
                    </View>
                        
                        
              </ScrollView>    

              </Image>
              <View style= {styles.newJournalFooter}>
                    <View style={styles.bottomPhoto}>
                        <TouchableOpacity style={styles.bottomBtn}>
                            <Image source={require('../../Images/safetyplan/my-feelings.png')} style={styles.photoIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomBtn}>
                            <Image source={require('../../Images/safetyplan/quick-plan.png')} style={styles.deleteIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomBtn}>
                            <Image source={require('../../Images/safetyplan/hope-box.png')} style={styles.duplicateIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
     


</View>

</SideMenu>
        );
    }
}

var NavigationBarRouteMapper = {
   LeftButton(route, navigator, index, navState) {
       return (
           <TouchableOpacity style={{flex: 1}} onPress={route.onLeftButtonPress}>
               <Image source={require('../../Images/safetyplan/menu-grey-icon.png')} style={styles.sideMenu} />
           </TouchableOpacity>

       );

   },
   RightButton(route, navigator, index, navState) {
       console.log('route, navigator ::> ',route, navigator);
       return (
          <TouchableOpacity style={{flex: 1}} >
               <Text> edit </Text>
            </TouchableOpacity>
      )
   },
   Title(route, navigator, index, navState) {
       return (
            <Text style={{flex: 1, color: 'black', justifyContent: 'center', margin: 5, fontSize: 20}}>
                Safety Plan
            </Text>
       );
   }
};


var styles = StyleSheet.create({
  main: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      height: height,
    },
    container: {
    flex            : 1,
    //ackgroundColor : '#f4f7f9',
    paddingTop      : 5,
    marginBottom: 50
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
  titleText: {
      fontWeight: "200",
      fontSize : 20,
      position: 'relative',
      backgroundColor: 'transparent',
      marginTop: height * 0.11,
      marginBottom: height * 0.02,
      alignSelf: 'center'
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
    happyIcon: {
        width: 150,
        height: 50,
        borderRadius: 30,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
         padding: 10
    },
     collapseContainer: {
      backgroundColor: '#ff6900',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03
    },
    smallButtons: {
      color: 'white',
      alignSelf: 'center',
      marginTop: 5
    },
    veryHappyCollapse: {
     backgroundColor: '#ff6900',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03

    },
    happyCollapse:{
      backgroundColor: '#ff9d43',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03
    }, 
    neutralCollapse: {
        backgroundColor: '#9B9B9B',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03
    },
    sadCollapse: {
      backgroundColor: '#84A4C7',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03
      }, 
    verySadCollapse: {
        backgroundColor: '#5A9BE7',
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      marginTop: height* 0.03
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
        backgroundColor: 'transparent',
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
    },
    newJournalFooter:{
        backgroundColor: '#ededed',
        paddingLeft: 10,
        paddingRight: 10,
        bottom: 80,
        marginTop: height * 1.03
    },
    bottomEditPanel: {
        alignSelf: 'flex-start',
        height: 60,
        top: -40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomPhoto: {
        alignSelf: 'flex-start',
        height: 60,
        top: -40,
        //justifyContent: 'center',
        flexDirection: 'row',
        //alignItems: 'center'
    },
    bottomBtn: {
        paddingLeft: 10
    },
    footerIcon: {
        height: 44,
        width: 45,
    },
    feelingBtn: {
        padding: 5
    },
    feelingIcon: {
        height: 35,
        width: 35,
    },
    photoIcon: {
      width: width * .10,
      height: height * .07,
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 10,
    },
    deleteIcon: {
        width: width * .07,
      height: height * .07,
        marginLeft: 80,
        marginTop: 50,
        marginBottom: 10,
    },
    duplicateIcon: {
     width: width * .07,
      height: height * .07,
        marginLeft: 90,
        marginTop: 50,
        marginBottom: 10,
       //left: width *.001
    }
});
AppRegistry.registerComponent('Panels', () => Panels);