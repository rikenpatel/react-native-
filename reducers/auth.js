
import constants, {USER_INFO_REQUEST, USER_LOGOUT,USER_INFO_ERROR, USER_INFO_SUCCESS, USER_INFO_NA, USER_INFO_SAVED_SUCCESS} from './../constants';
import {createReducers} from './../common/utils';

const initialState = {
    isAuthenticated: false,
    rememberMe: false,
    email: "",
    password: "",
    userInfo: null,
    authenticationStatus: null,
    loggingOutStatus: null
};

export default createReducers(initialState, {
    [USER_INFO_REQUEST] : (state) => {
        return {
            ...state,
            authenticationStatus: 'authenticating'
        }
    },
[USER_LOGOUT]: state => {

        return {
            ...state,
        isAuthenticated: false,
            rememberMe: false,
            email: "",
            password: "",
            userInfo: null,
            authenticationStatus: null,
            loggingOutStatus: null
        }
    },
    [USER_INFO_ERROR] : (state) => {
        return {
            ...state,
            isAuthenticated: false,
            userInfo: null,
            authenticationStatus: 'failed'
        }
    },
    [USER_INFO_SUCCESS] : (state, data) => {
        return {
            ...state,
            isAuthenticated: true,
            userInfo: data.payload,
            authenticationStatus: 'valid'
        }
    },
    [USER_INFO_SAVED_SUCCESS] : (state, data) => {
        return {
            ...state,
            rememberMe: data.payload.rememberMe,
            email: data.payload.email,
            password: data.payload.password
        }
    },
    [USER_INFO_NA] : (state) => {
        return {
            ...state,
            authenticationStatus: 'NA'
        }
    }
});
