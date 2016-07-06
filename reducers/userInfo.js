
import constants, { USER_AVATAR_SAVE_SUCCESS, USER_BIRTHDATE_SAVE_SUCCESS,
    USER_NAME_SAVE_SUCCESS, USER_PHONE_SAVE_SUCCESS, USER_EMAIL_SAVE_SUCCESS, USER_DOCTOR_VISITED_SAVE_SUCCESS} from './../constants';
import {createReducers} from './../common/utils';

const initialState = {
    items: [
        " ",
        "Tap to add your photo",
        "Name",
        "1-(650)-123-4567",
        "name@company.com",
        "Doctor you see",
        "Your birthdate is"
    ],
    date: new Date(),
    avatarSource: null,
    selectedItem: 'About',
    name: '',
    phone: '',
    email: '',
    doctorVisit: ''
};

export default createReducers(initialState, {
    [USER_AVATAR_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            avatarSource: data.payload
        }
    },
    [USER_BIRTHDATE_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            date: data.payload
        }
    },
    [USER_NAME_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            name: data.payload
        }
    },
    [USER_PHONE_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            phone: data.payload
        }
    },
    [USER_EMAIL_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            email: data.payload
        }
    },
    [USER_DOCTOR_VISITED_SAVE_SUCCESS] : (state, data) => {
        return {
            ...state,
            doctorVisit: data.payload
        }
    }
});
