
import {AsyncStorage} from 'react-native';
import {USER_LOGOUT,USER_INFO_SAVED_SUCCESS, USER_INFO_SUCCESS, USER_INFO_NA, USER_INFO_REQUEST, USER_INFO_ERROR} from './../constants';
import {createRequest} from './../common/utils';

module.exports = {
    isUserRemembered() {
        return dispatch => {
            AsyncStorage.getItem('zsplogindetails').then((data, error) => {
                if(data) {
                    data = JSON.parse(data);
                    if(data.rememberMe) {
                        dispatch({
                            type: USER_INFO_SAVED_SUCCESS,
                            payload: data
                        })
                    } else {
                        dispatch({
                            type: USER_INFO_NA
                        });
                    }
                }
            });
        }
    },

    userRemembered(data) {
        return dispatch => {
            AsyncStorage.setItem('zsplogindetails', JSON.stringify(data)).then(()=>{
                dispatch({
                    type: USER_INFO_SAVED_SUCCESS,
                    payload: data
                })
            });
        };
    },

    userRememberedDataCleared() {
        return dispatch => {
            AsyncStorage.removeItem('zsplogindetails');
        };
    },

    isAuthenticatedUser() {
        return dispatch => {
            dispatch({ type: USER_INFO_REQUEST });
            AsyncStorage.getItem('zsploginuserdetails')
                .then(userDetails => {
                    userDetails = JSON.parse(userDetails);
                    if(userDetails) {
                        dispatch({
                            type: USER_INFO_SUCCESS,
                            payload: userDetails
                        });
                    } else {
                        dispatch({
                            type: USER_INFO_NA
                        });
                    }
                })
                .catch(error => {
                    dispatch({
                        type: USER_INFO_ERROR
                    });
                });
        }
    },

    login(email, password) {
        //'super.admin',
        //    'Lean1234',

        return dispatch => {
            fetch('http://dev-accounts.leantaas.com/authenticate', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json',
                },
                body: JSON.stringify({
                    username : email,
                    password : password,
                    fingerprint : 'ASDF1234',
                })
            })

                .then((response) => response.text())
                .then((responseText) => {
                    dispatch({
                        type: USER_INFO_SUCCESS,
                        payload: responseText
                    });
                    AsyncStorage.setItem('zsploginuserdetails', JSON.stringify(responseText));
                })
                .catch((error) => {
                    console.warn(error);
                });
        };
    },

    logout() {
        return dispatch => {
        AsyncStorage.removeItem('zsploginuserdetails');

        dispatch({
                        type: USER_LOGOUT
                    });
        }
    }

};

