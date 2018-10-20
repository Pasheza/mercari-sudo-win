import {connect} from 'react-redux'
import App from "../App";
import {onSubmittingFile} from "../../actions";

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    onSubmittingFile
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;