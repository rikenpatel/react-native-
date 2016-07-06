import React, { Component } from 'react';
var ReactNative = require('react-native');
var {Icon, } = require('react-native-icons');
var {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Navigator
} = ReactNative;

const window = Dimensions.get('window');

var WIN = Dimensions.get('window');
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var UserSetting = require('../container/user/UserSetting');
var JournalingLanding = require('../container/journaling/journalingLanding');

export default class SideMenu extends Component {


    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
            />
        );
    }

    renderScene(route, navigator) {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.iconBar}>
                    <TouchableOpacity>
                        <Icon
                        name='ion|ios-home-outline'
                        size={35}
                        color='#424242'
                        style={styles.sideMenu}
                        />
                    </TouchableOpacity>
                    <Text style={styles.seperator}> | </Text>
                    <TouchableOpacity>
                        <Icon
                        name='ion|ios-gear-outline'
                        size={35}
                        color='#424242'
                        style={styles.sideMenu}
                        onPress={() => this.props.onItemSelected({ id: 'UserSetting'})}
                        />
                    </TouchableOpacity>
                    <Text style={styles.seperator}> | </Text>
                    <TouchableOpacity>
                        <Icon
                        name='ion|ios-bell-outline'
                        size={35}
                        color='#424242'
                        style={styles.sideMenu}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.tools}> 
                    <Text style={styles.nameTools}>TOOLS</Text>
                    <Image source={require('../Images/side-menu/orange_line.png')} style={styles.dividerhImage} /> 
                    <TouchableOpacity>
                    <Text
                        onPress={() => this.props.onItemSelected('Journaling')}
                        style={styles.item}>
                        Journaling
                    </Text>
                    </TouchableOpacity>
                    <Text
                        onPress={() => this.props.onItemSelected('SafetyPlan')}
                        style={styles.item}>
                        Safety Plan
                  </Text>
              </View>
              <View style={styles.metrics}> 
                    <Text style={styles.nameMetrics}>METRICS</Text>
                    <Image source={require('../Images/side-menu/green_line.png')} style={styles.dividerhImage} /> 
                    <Text
                        onPress={() => this.props.onItemSelected('Mood&Sleep')}
                        style={styles.item}>
                        Mood & Sleep Tracking
                    </Text>
                    <Text
                        onPress={() => this.props.onItemSelected('RecordMood')}
                        style={styles.item}>
                        Record Mood
                  </Text>
              </View>
              <View style={styles.reachout}> 
                    <Text style={styles.nameReachout}>REACHOUT</Text>
                    <Image source={require('../Images/side-menu/blue_line.png')} style={styles.dividerhImage} /> 
                    <Text
                        onPress={() => this.props.onItemSelected('GetHelpNow')}
                        style={styles.item}>
                        Get Help Now
                    </Text>
                    <Text
                        onPress={() => this.props.onItemSelected('Resources')}
                        style={styles.item}>
                        Resources
                  </Text>
              </View>
            </ScrollView>
        );
    }
}

SideMenu.propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
    menuActions: React.PropTypes.object
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'black',
        padding: 15,
    },
    tools: {
        marginTop: 50,
        marginLeft: WIN.width * .01,
    },
    nameTools: {
        color: '#FF7E00',
        fontSize: WIN.width * .045,
        fontFamily: 'Lato-Semibold'
    },
    metrics: {
        marginTop: 50,
        marginLeft: WIN.width * .01,
    },
    nameMetrics: {
        color: '#82b84e',
        fontSize: WIN.width * .045,
        fontFamily: 'Lato-Semibold'
    },
    reachout: {
        marginTop: 50,
        marginLeft: WIN.width * .01,
    },
    nameReachout: {
        color: '#4a88e0',
        fontSize: WIN.width * .045,
        fontFamily: 'Lato-Semibold'
    },
    item: {
        fontSize: WIN.width * .045,
        fontWeight: '300',
        paddingTop: 10,
        color: '#FFFFFF',
        fontFamily: 'lato-regular'
    },
    sideMenu: {
        flex: 1,
        width: 45,
        height: 45,
        marginLeft: WIN.width * .01,
        marginTop: WIN.height * .03,
    },
    iconBar: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: WIN.width * .01
    },
    seperator: {
        fontSize: 38,
        color: '#424242',
        marginTop: WIN.height * .03,
    },
    dividerhImage: {
      height: height * .0015,
      width: width*.55,
      alignSelf: 'flex-start',
      marginTop: height * .005,
      marginBottom: height*.005
    }

});
