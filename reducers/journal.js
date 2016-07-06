
import { JOURNALS_RECEIVED_SUCCESS, USER_AVATAR_SAVE_SUCCESS } from './../constants';
import {createReducers} from './../common/utils';

const initialState = {
    journals: [],
    activities: [{
        title: 'Go for a walk'
    },{
        title: 'Watch a movie'
    },{
        title: 'Work on a hobby project'
    },{
        title: 'Writing song lyrics'
    }]
};

export default createReducers(initialState, {
    [JOURNALS_RECEIVED_SUCCESS] : (state, data) => {
        return {
            ...state,
            journals: data.payload
        }
    },
});
