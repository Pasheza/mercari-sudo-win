import {connect} from 'react-redux'
import App from "../App";
import {onLoadingSpecs, onSubmittingFile} from "../../actions";
import {getAnalyzerResults, getFiles, getSpecs, getThirdCategory} from "../../reducers/reducer";

const mapStateToProps = (state) => ({
    files: getFiles(state.mercari),
    results: getAnalyzerResults(state.mercari),
    specs: getSpecs(state.mercari),
    category: getThirdCategory(state.mercari)
});

const mapDispatchToProps = {
    onSubmittingFile,
    onLoadingSpecs
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;