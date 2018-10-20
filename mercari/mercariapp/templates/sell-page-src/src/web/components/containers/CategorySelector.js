import {connect} from 'react-redux'
import {
    getFirstCategory,
    getFirstSelectOptions, getSecondCategory,
    getSecondSelectOptions, getThirdCategory,
    getThirdSelectOptions,
    getChosenSize, getSizeOptions
} from "../../reducers/reducer";
import {onChangeOfFirstCategory, onChangeOfSecondCategory, onChangeOfThirdCategory} from '../../actions/index'

import CategorySelector from "../CategorySelector";
import {onChangeOfSize} from "../../actions";

const mapStateToProps = (state) => ({
    firstSelectOptions: getFirstSelectOptions(state.mercari),
    secondSelectOptions: getSecondSelectOptions(state.mercari),
    thirdSelectOptions: getThirdSelectOptions(state.mercari),
    firstCategory: getFirstCategory(state.mercari),
    secondCategory: getSecondCategory(state.mercari),
    thirdCategory: getThirdCategory(state.mercari),
    sizes: getSizeOptions(state.mercari),
    chosenSize: getChosenSize(state.mercari)
});

const mapDispatchToProps = {
    onChangeOfFirstCategory,
    onChangeOfSecondCategory,
    onChangeOfThirdCategory,
    onChangeOfSize
};

const connectedCategorySelector = connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
export default connectedCategorySelector;