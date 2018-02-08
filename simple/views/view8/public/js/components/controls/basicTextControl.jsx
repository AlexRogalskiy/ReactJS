"use strict";
/**
 * Module dependencies
 */
import React          from 'react';
import update         from 'react-addons-update';
import ClassNames     from 'classnames';
import BasicTextInput from './BasicTextInput';
// import Utils          from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicTextControl extends React.Component {
	static propTypes: {
        label: Types.string,
        dataClass: Types.object,
        item: Types.object,
		key: Types.string
    }
    static defaultProps = {
        label: '',
        dataClass: {formClass: 'form-group', labelClass: 'control-label', controlClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            label: this.props.label,
            dataClass: this.props.dataClass,
            item: this.props.item,
            key: this.props.key
        };
    }
	onChange(e) {
		this.setState({ value: e.target.value });
	}
	render() {
        const { label, dataClass, ...rest } = this.props;
        const { formClass, labelClass, ...restClass } = dataClass;
        rest.dataClass = restClass;
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