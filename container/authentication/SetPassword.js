
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
    NativeModules,
    ScrollView,
    StatusBar
} = ReactNative;
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');
var Button = require('./../components/button');
import TextInput from './../../components/text-input';

export default class SetPassword extends Component {
    constructor() {
       super();
       this.state = {
            names: ["Temporary Password","New Password", "RESET PASSWORD"],
            email: "",
            password: ""
        };
    }
    render() {
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={this.props.navigator}
            />
        );
    }
    emailUpdated(event) {
        this.setState({email: event.nativeEvent.text});
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
                    <View style={styles.inputView}>
                    {/* TEMP PW Input  */}
                        <TextInput style={styles.phone} placeholder={this.state.names[0]}
                            ref="phone"
                            keyboardType="numeric"
                            value={this.state.phone}
                            onChange={this.phoneUpdated.bind(this)}>
                        </TextInput>
                    {/* NEW PW Input  */}
                        <TextInput style={styles.email} placeholder={this.state.names[1]}
                            ref="email"
                            value={this.state.email}
                            onChange={this.emailUpdated.bind(this)}>
                        </TextInput>
                        <View style={styles.forgotTag}>
                            <Text style={styles.forgotPassword} >
                                Passwords must contain at least one lowercase
                            </Text>
                            <Text style={styles.forgotPassword}>
                                letter, one uppercase letter, and one number
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 3}}>
                  {/* RESET PW Input  */}
                        <Button style={styles.signUpButton} title={this.state.names[2]} onPress={this.gotoUserDetails.bind(this)}>
                        </Button>
                    </View>
                    </ScrollView>
                </Image>
            </View>
        );
    }
    gotoLogin() {
        this.props.navigator.push ({
            id: 'Login'
        });
    }
    validate() {
      let {phone,email} = this.state;
      if(phone != "" && email != "") {
            return true;
      }
      return false;
    }
    gotoUserDetails() {
        if(this.validate()) {
        this.props.navigator.push ({
            id: 'UserDetails'
        });
      }   
    }
}

var styles = StyleSheet.create({
    main: {
        flex: 1
    },
    signUpButton: {
        padding: 10,
        backgroundColor: '#E2502A',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        margin: 10,
        marginTop: 40,
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
        marginTop: 20
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
    password: {
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
    backgroundImage: {
        flex: 1,
        width: WIN.width,
        height: WIN.height,
        position: 'absolute'

    },
    inputView: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginTop: WIN.height * .20,
    },
    buttonView: {
        flex: 1.5,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    orTag:{
        flex: 2,
        marginTop: 12
    },
    signupTag: {
        flex: 1,
        justifyContent: 'space-around',
        marginBottom: 30
    },
    forgotPassword: {
        alignSelf: 'center',
        fontSize: 14,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    facebook: {
        padding: 10,
        backgroundColor: '#2D418C',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 65,
        borderRadius: 50,
        marginTop: 10
    },
    twitter: {
        padding: 10,
        backgroundColor: '#459AE8',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 150,
        height: 65,
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 15
    },
    forgotPassword: {
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotTag:{
        flex: 2,
        alignItems: 'center'

    }
});