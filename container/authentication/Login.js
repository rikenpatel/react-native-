import React, { Component } from 'react';
import { View,
    Text,
    StyleSheet,
    Image,
    LinkingIOS,
    Navigator,
    Dimensions,
    ActivityIndicatorIOS,
    TouchableOpacity,
    ScrollView } from 'react-native';
import {Icon} from 'react-native-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Button from './../../components/button';
import SignUp from './Signup';
import ForgotPassword from './Forgot';
import CheckBox from 'react-native-checkbox';
import TextInput from './../../components/text-input';
import * as auth from './../../actions/auth';

var WIN = Dimensions.get('window');
var {height, width} = Dimensions.get('window');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ["1-(650)-123-4567","Password", "SIGN IN"],
            rememberMe: false,
            password: "",
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
    componentWillMount() {
        //this.props.authAction.login();
        //this.props.authAction.isUserRemembered();
    }
    componentWillReceiveProps(nextProps) {
        let { rememberMe, email, password } = nextProps.auth;
        if(rememberMe != this.state.rememberMe) {
            rememberMe ? this.setState({
                rememberMe,
                email,
                password
            }) : this.state({
                rememberMe
            });
        }
    }
    emailUpdated(event) {
        this.setState({email: event.nativeEvent.text});
    }
    passwordUpdated(event) {
        this.setState({password: event.nativeEvent.text});
    }
    rememberMe() {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    }
    renderScene(route, navigator) {
        console.log('this.props.auth.authenticationStatus == "authenticating" ::> ',this.props.auth.authenticationStatus == "authenticating");
            return (
            <View style={styles.main}>
                <Image source={require('../../Images/bg-lowSize/sfp-picture-bg.png')} style={styles.backgroundImage}>
                    <ScrollView>
                    <View style={styles.inputView}>
                        <TextInput style={styles.email}
                                   placeholder={this.state.names[0]}
                                   ref="email"
                                   value={this.state.email}
                                   onChange={this.emailUpdated.bind(this)}/>

                        <TextInput style={styles.password}
                                   ref='password'
                                   placeholder={this.state.names[1]}
                                   value={this.state.password}
                                   secureTextEntry={true}
                                   onChange={this.passwordUpdated.bind(this)}>
                        </TextInput>
                        <View style={styles.rememberTag}>
                            <CheckBox
                                labelStyle={{color: '#fff'}}
                                label='Remember me!'
                                checked={this.state.rememberMe}
                                onChange={this.rememberMe.bind(this)}
                            />
                        </View>
                    </View>
                        {
                            (this.props.auth.authenticationStatus == "authenticating") &&
                            <ActivityIndicatorIOS
                            animating={true}
                            style={[{height: 80}]}
                            size="large"
                            />
                        }
                    <View style={styles.buttonView}>
                        <Button style={styles.loginButton} title={this.state.names[2]} onPress={this.login.bind(this)}>
                        </Button>
                        <View style={styles.forgotTag}>
                            <Text style={styles.forgotPassword}
                                  onPress={this.gotoForgotPassword.bind(this)}>
                                Forgot Password?
                            </Text>
                        </View>
                        <View style={styles.signupTag}>
                            <Text style={styles.forgotPassword} onPress={this.gotoSignUp.bind(this)}>
                                Do not have an account? <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 16}}>Sign up</Text>
                            </Text>
                        </View>
                    </View>
                    </ScrollView>
                </Image>
            </View>
        );
    }
    login() {
        if(this.state.email.trim() != "" && this.state.password.trim() != "") {
            if(this.state.rememberMe ) {
                this.props.authAction.userRemembered(this.state);
            } else {
                this.props.authAction.userRememberedDataCleared();
            }
            this.props.authAction.login(this.state.email, this.state.password);
        }
    }
    gotoSignUp() {
        this.props.navigator.push ({
            id: 'SignUp'
        });
    }
    gotoForgotPassword() {
        this.props.navigator.push ({
            id: 'ForgotPassword'
        })
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
        width: width * .8,
        height: height * .1,
        borderRadius: width * .09,
        margin: 10,
        marginTop: 10
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
        marginTop: 20

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
        flex: 2,
        justifyContent: 'flex-end',
        marginTop: WIN.height * .20,
    },
    buttonView: {
        flex: 2,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    forgotTag:{
      flex: 2
    },
    signupTag: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    forgotPassword: {
        alignSelf: 'center',
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
    },
    rememberTag:{
     marginBottom: 15,
     marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    remeberMe: {
        alignSelf: 'center',
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    sideMenu: {
        //flex: 1,
        flexDirection: 'row',
        width: 15,
        height: 15,
        marginLeft: 90,
    }
});

export default connect(state => ({
    auth: state.auth,
}), (dispatch) => ({
    authAction: bindActionCreators(auth, dispatch),
}))(Login);