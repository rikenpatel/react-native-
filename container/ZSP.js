import React, { Component } from 'react';
import { Navigator, View, Text, ActivityIndicatorIOS, AsyncStorage } from 'react-native';
import Login from './authentication/Login';
import SignUp from './authentication/Signup';
import ForgotPassword from './authentication/Forgot';
import UserDetails from './user/UserInfo';
import UserSetting from './user/UserSetting';
import Journaling from './journaling/Journaling';
import QuickPlan from './safetyplan/QuickPlan';
import MyFeelings from './safetyplan/MyFeelings';
var SideMenu = require('react-native-side-menu');
import Menu from '../components/side-menu';
import * as auth from '../actions/auth';
import * as menu from '../actions/menu';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import Journaling from './journaling/journalingLanding';

class ZSP extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            isOpen: false,
            isAuthenticated: false
        };
    }
    componentWillMount() {
        // AsyncStorage.removeItem('zsploginuserdetails');
        this.props.authAction.isAuthenticatedUser();
   }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated && nextProps.auth.isAuthenticated != this.state.isAuthenticated) {
            this.setState({
                isAuthenticated: true
            }, () => {
                this.navigator.push({
                    id: 'QuickPlan',
                    
                });
            });
        }
    }
    updateMenuState() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    loadPage(item) {
        switch(item) {
            case 'Login':
                this.navigator.push ({
                    id: item,
                    name: item
                });
                break;
        }
    }

    onMenuItemSelected(item) {
        this.setState({
            isOpen: false
        }, () => {
            this.props.menuAction.menuItemSelected(item);
            this.loadPage(item);
        });
    }
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} />;

        if(this.props.auth.authenticationStatus == "authenticating" && !this.props.auth.isAuthenticated) {
            return <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicatorIOS
                        animating={true}
                        style={[{height: 80}]}
                        size="large"
                    />
                </View>
        }

        return (
            <View style={{flex:1}}>
                <SideMenu
                    menu={menu}
                    isOpen={this.state.isOpen}
                >
                    <Navigator
                        initialRoute={{id: (this.props.auth.isAuthenticated ?'Login' : 'SignUp')}}
                        renderScene={this.renderScene.bind(this)}
                        configureScene={(route) => {
                            if (route.sceneConfig) {
                                return route.sceneConfig;
                            }
                            return Navigator.SceneConfigs.PushFromRight;
                        }}
                    />
                </SideMenu>
            </View>
        )
    }
    renderScene(route, navigator ) {
        this.navigator = navigator;
        var routeId = route.id;
        switch(routeId) {
            case 'Login': return <Login navigator={navigator} />;
            case 'SignUp': return <SignUp navigator={navigator} />;
            case 'ForgotPassword': return <ForgotPassword navigator={navigator} />;
            case 'UserDetails': return <UserDetails navigator={navigator} />;
            case 'UserSetting': return <UserSetting navigator={navigator} />;
            case 'Journaling': return <Journaling updateMenuState={this.updateMenuState.bind(this)} navigator={navigator} />;
            case 'MyFeelings': return <MyFeelings updateMenuState={this.updateMenuState.bind(this)} navigator={navigator} />;
            case 'QuickPlan': return <QuickPlan navigator={navigator} />;
            default: return <Login />;
        }
    }
}

export default connect(state => ({
    auth: state.auth
}), (dispatch) => ({
    menuAction: bindActionCreators(menu, dispatch),
    authAction: bindActionCreators(auth, dispatch),
}))(ZSP);