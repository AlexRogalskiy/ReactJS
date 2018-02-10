"use strict";
/**
 * Module dependencies
 */
import React          from 'react';
import update         from 'react-addons-update';
import ClassNames     from 'classnames';

import BasicTextInput from 'appRoot/js/components/controls/BasicTextInput';
// import Logger          from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicTextControl extends React.Component {
    displayName: 'BasicTextControl'
	static propTypes: {
        dataClass: Types.object,
        validator: Types.string,
        label: Types.string,
        item: Types.object,
		key: Types.string
    }
    static defaultProps = {
        dataClass: { formClass: 'form-group', labelClass: 'control-label' },
        validator: '',
        label: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: props.dataClass,
            validator: props.validator,
            label: props.label,
            item: props.item,
            key: props.key
        };
    }
	onChange(field) {
		// this.setState({ value: e.target.value });
        return event => {
            const state = { value: event.target.value };
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.setState(state);
            this.refs[field].onChange(event);
            //this.props.change(event);
        };
	}
    // onChange(field) {
    //     return event => {
    //         let state = {};
    //         state[field] = event.target.value;
    //         this.setState(state);
    //     };
    // }
	render() {
        const { dataClass, label, ...rest } = this.props;
        const { formClass, labelClass, ...restClass } = dataClass;
        rest.dataClass = restClass;
		return (
			<div className={formClass}>
                <label className={labelClass} htmlFor={rest.name}>
                    {label}
                </label>
                <BasicTextInput ref={(input) => {this.textInput = input}} onChange={rest.onChange ? rest.onChange : this.onChange(rest.name)} {...rest}>
                    {rest.children}
                </BasicTextInput>
			</div>
		);
	}
};