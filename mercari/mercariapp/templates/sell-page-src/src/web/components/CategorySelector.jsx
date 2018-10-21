import React, {Component, Fragment} from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';
import {ControlLabel, FormGroup} from "react-bootstrap";


export default class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.optionsFromSpecs(props.specs),
            chosen: undefined
        }
    }

    optionsFromSpecs = (specs) => {
        return _.values(specs[this.props.thirdCategory]).map(item => ({
            label: item.itemName,
            value: item.itemName
        }));
    };

    onChangeOfFirstCategory = (selectedCategory) => {
        this.props.onChangeOfFirstCategory(selectedCategory)
    };

    onChangeOfSecondCategory = (selectedCategory) => {
        this.props.onChangeOfSecondCategory(selectedCategory);
    };

    onChangeOfThirdCategory = (selectedCategory) => {
        this.props.onChangeOfThirdCategory(selectedCategory);
    };


    brandInputChange = (newInput) => {
        if (newInput.trim() === "") {
            this.setState({
                options: this.optionsFromSpecs(this.props.specs)
            });
        } else {
            const specs = this.props.specs;
            const tags = newInput.split(' ');
            const newOptions = _.values(specs).filter(item => {
                return tags.find(tag => item.tags.includes(tag))
            });
            this.setState({
                options: newOptions
            });
        }
    };

    getOptions = () => {
        return this.state.options;
    };

    chooseItem = (item) => {
        this.setState({
            chosen: item
        });
        this.props.onChoosingItem(item)
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
                        onChange={(selected => this.onChangeOfThirdCategory(selected.label))}
                    />
                </FormGroup>}
                {props.thirdCategory &&
                <FormGroup
                    style={{marginLeft: 20, marginRight: 20, marginTop: 20}}
                >
                    <ControlLabel>Brand</ControlLabel>
                    <Select
                        value={this.state.chosen}
                        searchable={true}
                        options={this.optionsFromSpecs(this.props.specs)}
                        onChange={selected => this.chooseItem(selected.value)}
                    />
                </FormGroup>
                }
            </Fragment>
        )
    }

}