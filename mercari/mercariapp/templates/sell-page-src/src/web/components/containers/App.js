import {connect} from 'react-redux'
import App from "../App";
import {onSubmittingFile} from "../../actions";
import {getAnalyzerResults, getFiles} from "../../reducers/reducer";

const mapStateToProps = (state) => ({
    files: getFiles(state.mercari),
    results: getAnalyzerResults(state.mercari)
});

const mapDispatchToProps = {
    onSubmittingFile
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;