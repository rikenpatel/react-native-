// var React = require('react');
import React, { Component } from 'react';
import ReactNative from 'react-native';
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
    StatusBar,
    AlertIOS
} = ReactNative;
var {height, width, borderRadius, left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
var WIN = Dimensions.get('window');
import Button from './../../components/button';
import TextInput from './../../components/text-input';


export default class Signup extends Component {
    constructor() {
       super();
     
       this.state = {
            names: ["1-(650)-123-4567","Temporary Password", "SIGN UP"],
            phone: "",
            email: ""
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
    emailUpdated(event) {
        this.setState({email: event.nativeEvent.text});
    }
    renderScene(route, navigator) {
        return (
            <View style={styles.main}>
            <StatusBar barStyle="light-content" />

                <Image source={require('../../Images/bg-lowSize/sfp-picture-bg.png')} style={styles.backgroundImage}>
                    <ScrollView>
                    <View style={styles.inputView}>
                {/* Phone Input  */}
                        <TextInput style={styles.phone} placeholder={this.state.names[0]}
                            ref="phone"
                            //keyboardType="numeric"
                            value={this.state.phone}
                            onChange={this.phoneUpdated.bind(this)}>
                        </TextInput>
                {/* TEMP PW Input  */}
                        <TextInput style={styles.email} placeholder={this.state.names[1]}
                            ref="email"
                            secureTextEntry={true} 
                            value={this.state.email}
                            onChange={this.emailUpdated.bind(this)}>
                        </TextInput>
                    </View>
                    <View style={{flex: 3}}>
                {/* SIGN UP  BUTTON  */}
                        <Button style={styles.signUpButton} title={this.state.names[2]} onPress={this.gotoUserDetails.bind(this)}>
                        </Button>
                    </View>

                    <View style={styles.buttonView}>
                        <View style={styles.signupTag}>
                            <Text style={styles.forgotPassword} onPress={this.gotoLogin.bind(this)}>
                                Already signed up?  <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 16}}>Sign in</Text>
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
            id: 'Login'
        });
    }
    validate() {
        let {phone, email} = this.state;
        if(phone == "Super.admin" && email == "Lean1234") {
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
        AlertIOS.alert(
             'Login Failed'
            );
  }
}
var styles = StyleSheet.create({
    main: {
        flex: 1,

    },
    signUpButton: {
        padding: 10,
        backgroundColor: '#E2502A',
        justifyContent: 'center',
        alignSelf: 'center',
        //width: 300,
        width: width * .8,
        //height: 70,
        height: height * .1,
        //borderRadius: 35,
        borderRadius: width * .09,
        margin: 10,
        marginTop: 40,
    },
    phone: {
        //padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        //width: 300,
        width: width * .8,
        //height: 70,
        height: height * .1,
        //borderRadius: 35,
        borderRadius: width * .09,
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        marginTop: 50,
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
        fontWeight: 'bold',
        marginBottom: 100
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
    }
});