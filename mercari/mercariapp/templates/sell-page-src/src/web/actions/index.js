import {createAction} from 'redux-actions'
import {postFile} from "../utils/RequestUtils";

export const changeFirstCategory = createAction("FIRST/CATEGORY/CHANGE");
export const changeSecondCategory = createAction("SECOND/CATEGORY/CHANGE");
export const changeThirdCategory = createAction("THIRD/CATEGORY/CHANGE");
export const changeSize = createAction("SIZE/CHANGE");
export const addFile = createAction("FILE/ADD");


export const onChangeOfFirstCategory = (firstCategory) => dispatch => {
    dispatch(changeFirstCategory(firstCategory));
};

export const onChangeOfSecondCategory = (secondCategory) => dispatch => {
    dispatch(changeSecondCategory(secondCategory));
};


export const onChangeOfThirdCategory = (thirdCategory) => dispatch => {
    dispatch(changeThirdCategory(thirdCategory));
};

export const onChangeOfSize = (newSize) => dispatch => {
    dispatch(changeSize(newSize))
};

export const onSubmittingFile = file => dispatch => {
    postFile(file).then(() => dispatch(addFile(file)));
};