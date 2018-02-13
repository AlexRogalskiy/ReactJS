"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
// import ClassNames from 'classnames';

import BasicImageInput from 'appRoot/js/components/elements/BasicImageInput';
// import Logger      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicImageControl extends React.Component {
	displayName: 'BasicImageControl'
	static propTypes: {
		dataClass: Types.object,
		validator: Types.string,
		label: Types.string,
        item: Types.object
	}
    static defaultProps = {
        dataClass: { formClass: 'form-group', labelClass: 'control-label' },
        label: '',
        item: {}
    }
    getValidatorData() {
	    return this.state;
	}
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: props.dataClass,
            validator: props.validator,
            label: props.label,
			item: props.item
        };
    }
	onChange(field) {
		return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	this.setState(state);
	      	this.refs[field].onChange(event);
			if(this.props.onChange) {
				this.props.onChange(event);
			}
	    };
	}
	render() {
		const { dataClass, item, label, onChange, ...rest } = this.props;
		const { formClass, labelClass, ...restClass } = dataClass;
        return (
			<div className={formClass}>
                <label className={labelClass} htmlFor={rest.name}>
                    {label}
                </label>
                <BasicImageInput ref={(input) => {this.imageInput = input}} onChange={this.onChange(rest.name)} {...rest}>
                    {rest.children}
                </BasicImageInput>
			</div>
		);
	}
};