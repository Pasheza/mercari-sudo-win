import {createAction} from 'redux-actions'
import {getSpecs, postFile} from "../utils/RequestUtils";

export const changeFirstCategory = createAction("FIRST/CATEGORY/CHANGE");
export const changeSecondCategory = createAction("SECOND/CATEGORY/CHANGE");
export const changeThirdCategory = createAction("THIRD/CATEGORY/CHANGE");
export const addFile = createAction("FILE/ADD");
export const addResults = createAction("RESULTS/ADD");
export const loadSpecs = createAction("SPECS/LOAD");


export const onChangeOfFirstCategory = (firstCategory) => dispatch => {
    dispatch(changeFirstCategory(firstCategory));
};

export const onChangeOfSecondCategory = (secondCategory) => dispatch => {
    dispatch(changeSecondCategory(secondCategory));
};


export const onChangeOfThirdCategory = (thirdCategory) => dispatch => {
    dispatch(changeThirdCategory(thirdCategory));
};

export const onSubmittingFile = file => dispatch => {
    postFile(file).then(results => {
        dispatch(addResults(results.status));
        dispatch(addFile(file))
    });

};

export const onLoadingSpecs = () => dispatch => {
    getSpecs().then(json => {
        let specs = {};
        _.keys(json).forEach(category => {
            specs[category] =_.keyBy(json[category], "itemName")
        });
        dispatch(loadSpecs(specs))
    });
};