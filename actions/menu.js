
import { MENU_ITEM_SELECTED } from './../constants';
import {createRequest} from './../common/utils';

module.exports = {
    menuItemSelected(menuItem) {
        return dispatch => {
            dispatch({
                type: MENU_ITEM_SELECTED,
                payload: menuItem
            })
        }
    }
};

