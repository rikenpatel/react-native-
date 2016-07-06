import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    Navigator,
    Dimensions,
    ScrollView,
    StatusBar
} = ReactNative;

var WIN = Dimensions.get('window');
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
import Button from './../../components/button';
import TextInput from './../../components/text-input';

export default class Forgot extends Component {
    constructor() {
      super();
      this.state = {
            names: [
                "1-(650)-123-4567",
                "RESET PASSWORD"
            ],
            phone: " "
        };
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
            />
        );
    }

    phoneUpdated(event) {
        this.setState({phone: event.nativeEvent.text});
    }

    renderScene(route, navigator) {
        return (
            <View style={styles.main}>
            <StatusBar barStyle="light-content" />

                <Image source={require('../../Images/bg.png')} style={styles.backgroundImage}>
                <ScrollView>
            {/* Phone View */}
                    <View style={styles.inputView}>                             
                        <TextInput style={styles.phone} placeholder={this.state.names[0]}
                        ref="phone"
                        keyboardType="numeric"
                        value={this.state.phone}
                        onChange={this.phoneUpdated.bind(this)}>
                        </TextInput>
                    </View>
            {/* RESET PW View */}
                    <View style={styles.buttonView}>
                        <Button style={styles.loginButton} title={this.state.names[1]} onPress={this.gotoLogin.bind(this)} >
                        </Button>
                        <View style={styles.forgotTag}>
                            <Text style={styles.forgotPassword} >
                                Not to worry, password reset
                            </Text>
                            <Text style={styles.forgotPassword}>
                                instructions are landing
                            </Text>
                            <Text style={styles.forgotPassword}>
                                in your inbox now!
                            </Text>
                        </View>
                    </View> 
                    </ScrollView>
                </Image>
            </View>
        );
    }

    gotoLogin() {
        this.props.navigator.push ({
            id: 'Login',
            name: 'Login'
        });
    }
}

var styles = StyleSheet.create({
    main: {
        flex: 1
    },
    loginButton: {
        padding: 10,
        backgroundColor: '#E2502A',
        justifyContent: 'center',
        alignItems: 'center',
        //width: 300,
        //height: 70,
        //borderRadius: 35,
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        margin: 10,
        marginBottom: 20,
        marginTop: 25
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
        marginTop: 30
    },
    tempPwd: {
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
        marginTop: 20
    },
    backgroundImage: {
        flex: 1,
        width: WIN.width,
        height: WIN.height,
        position: 'absolute'

    },
    inputView: {
        flex: 2,
        justifyContent: 'flex-end',
        marginTop: WIN.height * .20,
    },
    buttonView: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    forgotTag:{
        flex: 2,
        alignItems: 'center'

    },
    signupTag: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    forgotPassword: {
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});