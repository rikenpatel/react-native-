import React, {Component} from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');
var SideMenu = require('react-native-side-menu');
import Menu from '../../components/side-menu';

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
    Switch
    } = ReactNative;
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');
import Button from './../../components/button';
import TextInput from './../../components/text-input';
//import UserSetting from './UserSetting';


export default class jornalingLanding extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            isOpen: false
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
      <Image source={require('../../Images/journaling/bg.png')} style={styles.backgroundImage}>
              <ScrollView> 
              <View style={{flex: 8}}>       
                  <View style={styles.journaling}>
                        <View style={styles.journalEntry}>
                            <Image source={require('../../Images/journaling/new-entry-plus-icon.png')} style={styles.newEntryImage} />
                            <Text style={styles.entrySetting}>
                                Create
                            </Text>
                            <Text style={styles.entry2Setting}>
                                New Entry
                            </Text>
                        </View>

                        <View style={styles.activityEntry}>
                        <Image source={require('../../Images/journaling/divider-line.png')} style={styles.dividerImage} />
                            <Image source={require('../../Images/journaling/activity-entry-badge-icon.png')} style={styles.activityImage} />
                            <Text style={styles.activitySetting}>
                                From Activity
                            </Text>
                        </View>
                  </View>








                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                02 April 2016
                            </Text>
                            <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ....
                            </Text>
                        </View>
                  </View>
{/* ------------------------------March 2016-------------------------------- */}

                          <Image source={require('../../Images/journaling/month-divider-march.png')} style={styles.monthDividerImage} />
                  
                  <View style={styles.journalEntryFeedWithTitle}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                31 March 2016
                            </Text>
                            <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                       <View style={styles.jornalTitle}>
                            <Text style={styles.titleText}>
                                Great day at the park
                              </Text>
                          </View>
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Took the dog to the park today, it was nice to be out in the sun after allthat rain. Sometimes I forget how much better I feel… 
                            </Text>
                        </View>
                  </View>

                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                16 March 2016
                            </Text>
                            <Image source={require('../../Images/journaling/neutral-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Everything got done, and things have balanced out a bit.
                            </Text>
                        </View>
                  </View>

                  <View style={styles.journalEntryFeedWithTitle}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                14 March 2016
                            </Text>
                            <Image source={require('../../Images/journaling/happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.jornalTitle}>
                            <Text style={styles.titleText}>
                                Just one good day
                              </Text>
                          </View>
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Nothing interesting happened today, but it was a good... 
                            </Text>
                        </View>
                  </View>

                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                12 March 2016
                            </Text>
                            <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Had a fight with my best friend today, I just don’t know how to talk to him anymore. I don’t know if something about me has…
                            </Text>
                        </View>
                  </View>

                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                02 March 2016
                            </Text>
                            <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Took the dog to the park today, it was nice to be out in the sun after all that rain. Sometimes I forget how much better I feel… 
                            </Text>
                        </View>
                  </View>

{/* ------------------------------February 2016-------------------------------- */}

                          <Image source={require('../../Images/journaling/month-divider-feb.png')} style={styles.monthDividerImage} />
                  
                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                29 February 2016
                            </Text>
                            <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Everything got done, and things have balanced out a bit.
                            </Text>
                        </View>
                  </View>

                  <View style={styles.journalEntryFeed}> 
                        <View style={styles.journalHeading}> 
                            <Text style={styles.dateText}>
                                22 February 2016
                            </Text>
                            <Image source={require('../../Images/journaling/happy-entry-icon.png')} style={styles.feelingIcon} />
                        </View>
                            <Image source={require('../../Images/journaling/divider-line-h.png')} style={styles.dividerhImage} />
                        <View style={styles.journalDesc}> 
                            <Text style={styles.descText}>
                                Had a fight with my best friend today, I just don’t know how to talk to him anymore. I don’t know if something about me has…
                            </Text>
                        </View>
                  </View>
  
        </View>
        
    </ScrollView>
     <View style= {styles.journalingFooter}>
          <TouchableHighlight style={styles.bottomCalendar}>
                  <Image source={require('../../Images/journaling/filter-calendar-icon.png')} style={styles.footerIcon} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomFeeling}>
              <Image source={require('../../Images/journaling/filter-feeling-icon.png')} style={styles.footerIcon} />
          </TouchableHighlight>
        </View> 

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
               <Image source={require('../../Images/journaling/search-icon.png')} style={styles.searchIcon} />
            </TouchableOpacity>


           // <TouchableOpacity style={{flex: 1}}>
           //     <Icon
           //         name='ion|gear-a'
           //         size={40}
           //         color='#FFFFFF'
           //         style={styles.sideMenu}
           //     />
           // </TouchableOpacity>
      )
   },
   Title(route, navigator, index, navState) {
       return (
            <Text style={{flex: 1, color: 'white', justifyContent: 'center', margin: 5, fontSize: 20}}>
                Journaling
            </Text>
       );
   }
};


var styles = StyleSheet.create({
  main: {
      flex: 1,
      flexDirection: 'column'
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
      marginLeft: 20,
      marginTop: 10,
      color: '#FF7E00',
      fontWeight: 'bold'
    },
    feelingIcon: {
        width: width * .07,
        height: height * .04,
        position: 'absolute',
        left: WIN.width*.78,
        //marginLeft: 55,
        marginTop: 3,
        //marginBottom: 15,
        //marginRight: 10,
        alignSelf: 'flex-end',
    },
    dividerhImage: {
      height: height * .0015,
      width: width * 0.8,
      alignSelf: 'center',
      marginTop: 8,
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
    footerIcon: {
      width: width * .09,
        height: height * .05,
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 10
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
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height:70,
        alignItems:'center',
    },
    searchIcon: {
        width: width * .09,
        height: height * .05,
        right: 2,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 5
    }
});
