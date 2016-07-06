
import constants, { MENU_ITEM_SELECTED } from './../constants';
import {createReducers} from './../common/utils';

const initialState = {
    selectedItem: 'About'
};

export default createReducers(initialState, {
    [MENU_ITEM_SELECTED] : (state, data) => {
        console.log('data.payload ::> ',data.payload);
        return {
            ...state,
            selectedItem: data.payload
        }
    }
});
