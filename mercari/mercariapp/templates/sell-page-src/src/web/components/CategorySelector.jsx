import React, {Component, Fragment} from 'react'
import Select from 'react-select'
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";


export default class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: undefined
        }
    }

    onChangeOfFirstCategory = (selectedCategory) => {
        this.props.onChangeOfFirstCategory(selectedCategory)
    };

    onChangeOfSecondCategory = (selectedCategory) => {
        this.props.onChangeOfSecondCategory(selectedCategory);
    };

    onChangeOfThirdCategory = (selectedCategory) => {
        this.props.onChangeOfThirdCategory(selectedCategory);
    };


    onChangeOfSize = (newSize) => {
        this.props.onChangeOfSize(newSize);
    };

    changeBrand = (newBrand) => {
        console.log(newBrand);
        this.setState({
            brand: newBrand.target.value
        })
    };

    render() {
        const props = this.props;
        return (
            <Fragment>
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20}}
                >
                    <Select
                        style={{borderStyle: "none"}}
                        value={props.firstCategory}
                        options={props.firstSelectOptions}
                        onChange={(selected => this.onChangeOfFirstCategory(selected.value))}
                    />
                </FormGroup>
                {props.firstCategory &&
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20, marginTop: 20}}
                >
                    <Select
                        style={{borderStyle: "none"}}
                        value={props.secondCategory}
                        options={props.secondSelectOptions}
                        onChange={(selected => this.onChangeOfSecondCategory(selected.value))}
                    />
                </FormGroup>}
                {props.secondCategory &&
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20, marginTop: 20}}
                >
                    <Select
                        style={{borderStyle: "none"}}
                        value={props.thirdCategory}
                        options={props.thirdSelectOptions}
                        onChange={(selected => this.onChangeOfThirdCategory(selected.value))}
                    />
                </FormGroup>}
                {props.thirdCategory &&
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20, marginTop: 20}}
                >
                    <ControlLabel>
                        <span className="red-text">*</span>
                        Size
                    </ControlLabel>
                    <Select
                        value={props.chosenSize}
                        options={props.sizes}
                        onChange={(selected => this.onChangeOfSize(selected.value))}
                    />
                </FormGroup>}
                {props.thirdCategory &&
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20, marginTop: 20}}
                >
                    <ControlLabel>Brand</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.brand}
                        placeholder="Enter brand"
                        onChange={this.changeBrand}
                    />
                </FormGroup>
                }
            </Fragment>
        )
    }

}