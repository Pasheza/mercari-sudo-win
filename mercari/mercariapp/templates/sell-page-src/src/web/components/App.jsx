import React, {Component} from "react";
import {
    Grid,
    Row,
    Thumbnail,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    ButtonToolbar, ToggleButtonGroup, ToggleButton, Button
} from "react-bootstrap"
import {Image} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import CategorySelector from "./containers/CategorySelector";
import {getAnalyzerInfo, greenCodes, redCodes} from '../utils/Constants'
import ItemSpecs from "./ItemSpecs";

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
            condition: undefined,
            description: undefined,
        };
        this.props.onLoadingSpecs();
    }

    onDrop = (files) => {
        this.props.onSubmittingFile(files[0]);
    };

    onChangeOfCategory = (selectedCategory) => {
        alert(`Selected category ${selectedCategory.value}`)
    };

    getInfoColor = (code) => {
        if (greenCodes.includes(code)) return "green";
        else if (redCodes.includes(code)) return "red";
        else return "orange"
    };

    onChoosingItem = (itemName) => {
        if(itemName){
            this.setState({
                description: this.props.specs[this.props.category][itemName].specs
            })
        }
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
                    <div className="menu-block-div" style={{display: "flex"}}>
                        {this.props.files.map((file, index) => {
                            return (
                                <div style={{marginLeft: 5, marginRight: 5, width: 190, height: 200}}
                                >
                                    <div style={{width: 190, height: 170, display: "flex"}} className="white-back">
                                        <Image src={`/static/toSave/${file.name}`}
                                               style={{maxHeight: 170, maxWidth: 190, margin: "auto"}}
                                        />
                                    </div>
                                    <Button style={{width: 190}}
                                    >Delete</Button>
                                    {this.props.results[index] && <span style={{
                                        textAlign: "center",
                                        color: this.getInfoColor(this.props.results[index])
                                    }}>{getAnalyzerInfo(this.props.results[index])}</span>}
                                </div>
                            )
                        })}
                        <Dropzone onDrop={this.onDrop}
                                  style={{...dropZoneStyle, width: 800 - 200 * this.props.files.length - 10}}>
                            <Thumbnail src="/static/images/saveFIleIcon.png" style={fileIconStyle}>
                                <p>Drag and drop photos or click to select images.</p>
                            </Thumbnail>
                        </Dropzone>
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
                        <CategorySelector
                            onChoosingItem={this.onChoosingItem}
                            specs={this.props.specs}
                        />
                    </div>
                </Row>
                {this.state.description &&
                <Row>
                    <div className="menu-block-div white-back border-eight">
                        <ItemSpecs specs={this.state.description}/>
                    </div>
                </Row>
                }
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