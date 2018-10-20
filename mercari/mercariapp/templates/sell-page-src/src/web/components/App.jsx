import React, {Component} from "react";
import {
    Grid,
    Row,
    Image,
    Thumbnail,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    ButtonToolbar, ToggleButtonGroup, ToggleButton, Button, ButtonGroup, Col
} from "react-bootstrap"
import Dropzone from 'react-dropzone'
import CategorySelector from "./containers/CategorySelector";

require("../css/styles.css");
const dropZoneStyle = {
    textAlign: "center",
    backgroundColor: "white",
    height: 200,
    borderStyle: "none",
    margin: "auto"
};

const fileIconStyle = {
    top: "50%",
    position: "relative",
    transform: 'translate(-0%, -50%)',
    borderStyle: "none"
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: undefined
        }
    }


    onDrop = (files) => {
        this.props.onSubmittingFile(files[0]);
    };

    onChangeOfCategory = (selectedCategory) => {
        alert(`Selected category ${selectedCategory.value}`)
    };

    render() {
        return (
            <Grid>
                <Row>
                    <div className="menu-block-div" style={{width: "15%", margin: "auto", marginTop: "20px"}}>
                        <Image src="/static/images/mercari-logo.svg" rounded/>
                    </div>
                </Row>
                <Row>
                    <div className="menu-block-div">
                        {this.props.files.map(file => {
                            return (
                                <Col>
                                    <Thumbnail src={`/static/toSave/${file.name}`}
                                               style={{marginLeft: 10, marginRight: 10, width: 180}}
                                    >
                                        <ButtonGroup>
                                            <Button>Delete</Button>
                                        </ButtonGroup>
                                    </Thumbnail>
                                </Col>)
                        })}
                        <Col>
                            <Dropzone onDrop={this.onDrop} style={dropZoneStyle}>
                                <Thumbnail src="/static/images/saveFIleIcon.png" style={fileIconStyle}>
                                    <p>Drag and drop photos or click to select images.</p>
                                </Thumbnail>
                            </Dropzone>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <div className="menu-block-div white-back border-eight">
                        <FormGroup style={{margin: "auto", width: "90%", height: "90%"}}>
                            <ControlLabel>
                                <span className="red-text">*</span>
                                Title
                            </ControlLabel>
                            <FormControl type="text"
                                         placeholder="Create title for your item"
                            />
                            <ControlLabel>
                                <span className="red-text">*</span>
                                Description
                            </ControlLabel>
                            <FormControl style={{resize: "vertical"}}
                                         componentClass="textarea"
                                         placeholder="Describe your item"
                            />
                            <br/>
                            <InputGroup>
                                <InputGroup.Addon>#</InputGroup.Addon>
                                <FormControl type="text"
                                             placeholder="Add up to 3 tags (optional)"
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>
                </Row>
                <Row>
                    <div className="menu-block-div white-back border-eight">
                        <CategorySelector/>
                    </div>
                </Row>
                <Row>
                    <div className="menu-block-div white-back border-eight">
                        <FormGroup
                            style={{marginLeft: 30, marginRight: 30}}
                        >
                            <ButtonToolbar>
                                <ControlLabel><span className="red-text">*</span>Condition</ControlLabel>
                                <ToggleButtonGroup justified
                                                   type="radio"
                                                   name="conditions"
                                                   defaultValue={this.state.condition}
                                >
                                    <ToggleButton value={1}
                                                  className="condition-radio"
                                    >New</ToggleButton>
                                    <ToggleButton value={2}
                                                  className="condition-radio"
                                    >Like New</ToggleButton>
                                    <ToggleButton value={3}
                                                  className="condition-radio"
                                    >Good</ToggleButton>
                                    <ToggleButton value={4}
                                                  className="condition-radio"
                                    >Fair</ToggleButton>
                                    <ToggleButton value={5}
                                                  className="condition-radio"
                                    >Poor</ToggleButton>

                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </FormGroup>
                    </div>
                </Row>
                <Row>
                    <div className="menu-block-div">
                        <div style={{margin: "auto", width: 600}}>
                            <Button bsStyle="warning"
                                    style={{width: 600}}
                            >List</Button>
                        </div>
                    </div>
                </Row>
            </Grid>
        )
    }
}

export default App;