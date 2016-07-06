
module.exports = {
    createConstants(...constants) {
        return constants.reduce((list, constant) => {
            list[constant] = constant;
            return list;
        }, {});
    },
    createReducers(initialState, reducers = {}) {
        return (state = initialState, action = {}) => {
            let reducer = reducers[action.type];
            return reducer ? reducer(state, action) : state;
        };
    }

};

