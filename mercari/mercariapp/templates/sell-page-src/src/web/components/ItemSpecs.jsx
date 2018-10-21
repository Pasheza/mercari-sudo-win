import React, {Component} from 'react'
import _ from 'lodash'

export default class ItemSpecs extends Component {
    render() {
        const specs = this.props.specs;
        return (
            <div style={{marginLeft: 10}}>
                {_.keys(specs).map(key => {
                    const values = specs[key];
                    return (
                        <div style={{marginLeft: 20}}>
                            <h3>{key}:</h3>
                            {_.keys(values).map(attribute => {
                                return(<h4>{attribute}: {values[attribute]}</h4>)
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}