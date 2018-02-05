"use strict";
/**
 * Module dependencies
 */
import React          from 'react';
import update         from 'react-addons-update';
import ClassNames     from 'classnames';
import BasicTextInput from './BasicTextInput';
import Logger         from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicTextControl extends React.Component {
    mixins: [Logger]
	propTypes: {
        label: Types.string,
        data: Types.object,
        item: Types.object,
		key: Types.string
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    getDefaultProps() {
        return {
            label: '',
            data: {formClass: 'form-group', labelClass: 'control-label', controlClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
            item: {},
        	key: ''
        };
    }
    getInitialState() {
		return {
            label: this.props.label,
            data: this.props.data,
            item: this.props.item,
            key: this.props.key
        };
	}
	onChange(e) {
		this.setState({ value: e.target.value });
	}
	render() {
        const { label, data, ...rest } = this.props;
        const { formClass, labelClass, ...restClass } = data;
        rest.data = restClass;
		return (
			<div className={formClass} {...rest}>
                <label className={labelClass} htmlFor={rest.name}>
                    {label}
                </label>
                <BasicTextInput ref={(input) => {this.textInput = input;}} onChange={rest.onChange ? rest.onChange : this.onChange} {...rest}>
                    {rest.children}
                </BasicTextInput>
			</div>
		);
	}
};