import {handleActions} from 'redux-actions'
import {changeFirstCategory, changeSecondCategory, changeThirdCategory, changeSize, addFile} from '../actions'

import _ from 'lodash'

export const getFiles = (state) => {
    return _.values(state.files);
};

export const getSizeOptions = (state) => {
    return state.sizes.map(s => ({label: s, value: s}));
};

export const getChosenSize = (state) => {
    return state.chosenSize;
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
        Women: {
            Skirts: {
                Mini: {
                    label: "Mini",
                    value: 100
                },
                Pencil: {
                    label: "Pencil",
                    value: 101
                }
            },
            Shirts: {
                "T-shirts": {
                    label: "T-shirts",
                    value: 102
                },
                Uniform: {
                    label: "Uniform",
                    value: 103
                }
            }
        },
        Men: {
            Shoes: {
                Sneakers: {
                    label: "Sneakers",
                    value: 104
                },
                Slipons: {
                    label: "Slipons",
                    value: 105
                }
            },
            Shirts: {
                "T-shirts": {
                    label: "T-shirts",
                    value: 106
                },
                Uniform: {
                    label: "Uniform",
                    value: 107
                }
            }
        }
    },
    sizes: ["XXL", "XL", "L", "M", "S", "XS", "XXS"],
    chosenSize: undefined,
    firstCategory: undefined,
    secondCategory: undefined,
    thirdCategory: undefined,
    files: {}
};

let reducer = handleActions(
    {
        [changeFirstCategory]: (state, {payload}) => {
            if(state.firstCategory !== payload)
            return {
                ...state,
                firstCategory: payload,
                secondCategory: undefined,
                thirdCategory: undefined,
                chosenSize: undefined
            };
            else return state;
        },
        [changeSecondCategory]: (state, {payload}) => {
            if(state.secondCategory !== payload)
            return {
                ...state,
                secondCategory: payload,
                thirdCategory: undefined,
                chosenSize: undefined
            };
            else return state;
        },
        [changeThirdCategory]: (state, {payload}) => {

            if(state.thirdCategory !== payload)
            return {
                ...state,
                thirdCategory: payload
            };
            else return state;
        },
        [changeSize]: (state, {payload}) => {
            return {
                ...state,
                chosenSize: payload
            }
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
        }
    },
    defaultState
);

export default reducer;