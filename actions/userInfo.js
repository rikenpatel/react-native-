
import {AsyncStorage} from 'react-native';
import {USER_AVATAR_SAVE_SUCCESS, USER_BIRTHDATE_SAVE_SUCCESS,
USER_NAME_SAVE_SUCCESS, USER_PHONE_SAVE_SUCCESS, USER_EMAIL_SAVE_SUCCESS, USER_DOCTOR_VISITED_SAVE_SUCCESS} from './../constants';
import {createRequest} from './../common/utils';
var {
    Platform
    } = require('react-native');


module.exports = {
    saveUserAvatar(avatarUri) {
        return dispatch => {
            // You can display the image using either:
            //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
            var source;
            if (Platform.OS === 'android') {
                source = {uri: avatarUri, isStatic: true};
            } else {
                source = {uri: avatarUri.replace('file://', ''), isStatic: true};
            }
            dispatch({
                type: USER_AVATAR_SAVE_SUCCESS,
                payload: source
            })
        }
    },
    saveUserBirthDate(date) {
        return dispatch => {
            dispatch({
                type: USER_BIRTHDATE_SAVE_SUCCESS,
                payload: date
            })
        }
    },
    nameUpdated(data) {
        return dispatch => {
            dispatch({
                type: USER_NAME_SAVE_SUCCESS,
                payload: data
            })
        }
    },
    phoneUpdated(data) {
        return dispatch => {
            dispatch({
                type: USER_PHONE_SAVE_SUCCESS,
                payload: data
            })
        }
    },
    emailUpdated(data) {
        return dispatch => {
            dispatch({
                type: USER_EMAIL_SAVE_SUCCESS,
                payload: data
            })
        }
    },
    doctorVisitUpdated(data) {
        return dispatch => {
            dispatch({
                type: USER_DOCTOR_VISITED_SAVE_SUCCESS,
                payload: data
            })
        }
    }
};

