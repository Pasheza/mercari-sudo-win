import {handleActions} from 'redux-actions'
import {
    changeFirstCategory,
    changeSecondCategory,
    changeThirdCategory,
    addFile,
    addResults, loadSpecs
} from '../actions'

import _ from 'lodash'

export const getSpecs = (state) => {
    return state.specs;
};

export const getAnalyzerResults = (state) => {
    return state.analyzerResults;
};

export const getFiles = (state) => {
    return _.values(state.files);
};


export const getCategories = (state) => {
    return state.categories;
};

export const getFirstCategory = (state) => {
    return state.firstCategory;
};

export const getSecondCategory = (state) => {
    return state.secondCategory;
};

export const getThirdCategory = (state) => {
    return state.thirdCategory;
};


export const getFirstSelectOptions = (state) => {
    return _.keys(state.categories).map(category => mapCategoryToOption(category));
};

export const getSecondSelectOptions = (state) => {
    const firstCategory = state.firstCategory;
    if (firstCategory) return _.keys(state.categories[state.firstCategory]).map(cat => mapCategoryToOption(cat));
    else return [];
};

export const getThirdSelectOptions = (state) => {
    const firstCategory = state.firstCategory;
    const secondCategory = state.secondCategory;
    if (firstCategory && secondCategory) return _.keys(state.categories[firstCategory][secondCategory]).map(cat => mapCategoryToOption(cat));
    else return [];
};

const mapCategoryToOption = (category) => {
    return {
        label: category,
        value: category
    }
};

const defaultState = {
    categories: {
        Tech: {
            "Computers & tablets": {
                Tablet: {
                    label: "Tablet",
                    value: 101
                }
            },
            "Cell phones & accessories": {
                "Cell phones & smartphones": {
                    label: "T-shirts",
                    value: 102
                }
            }
        }
    },
    firstCategory: undefined,
    secondCategory: undefined,
    thirdCategory: undefined,
    files: {},
    analyzerResults: [],
    specs: {}
};

let reducer = handleActions(
    {
        [changeFirstCategory]: (state, {payload}) => {
            if (state.firstCategory !== payload)
                return {
                    ...state,
                    firstCategory: payload,
                    secondCategory: undefined,
                    thirdCategory: undefined,
                };
            else return state;
        },
        [changeSecondCategory]: (state, {payload}) => {
            if (state.secondCategory !== payload)
                return {
                    ...state,
                    secondCategory: payload,
                    thirdCategory: undefined,
                };
            else return state;
        },
        [changeThirdCategory]: (state, {payload}) => {

            if (state.thirdCategory !== payload)
                return {
                    ...state,
                    thirdCategory: payload
                };
            else return state;
        },
        [addFile]: (state, {payload}) => {
            const filesNum = _.keys(state.files).length;
            return {
                ...state,
                files: {
                    ...state.files,
                    [`File${filesNum + 1}`]: payload
                }
            }
        },
        [addResults]: (state, {payload}) => {
            let results = state.analyzerResults;
            results.push(payload);
            return {
                ...state,
                analyzerResults: results
            }
        },
        [loadSpecs]: (state, {payload}) => {
            return {
                ...state,
                specs: payload
            }
        }
    },
    defaultState
);

export default reducer;