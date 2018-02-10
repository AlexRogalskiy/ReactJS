"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';

import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import Validators from 'appRoot/js/mixins/validators';
import HelpText   from 'appRoot/js/mixins/utility';
// import Logger      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

class BasicImage extends React.Component {
	displayName: 'BasicImage'
	static propTypes: {
		dataClass: Types.object,
		validator: Types.string,
        item: Types.object,
        key: Types.string
	}
    static defaultProps = {
        dataClass: {labelClass: 'control-label', formClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
        className: 'form-control',
        validator: '',
        item: {},
        key: ''
    }
    getValidatorData() {
	    return this.state;
	}
    constructor(props) {
        super(props);
        this.activateValidation = this.activateValidation.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            validator: props.validator,
			item: props.item,
			key: props.key
        };
        this.validatorTypes = Validators[this.props.validator];
    }
    activateValidation(field) {
    	return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
	    };
	}
	onChange(field) {
		return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
	    };
	}
	getClassName(field) {
		return this.props.isValid(field) ? '' : 'has-error';
	}
	render() {
		const { dataClass, item, label, validator, errors, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
		let errorMessage = getValidationMessages(rest.name);
		let formClass = dataClass.formClass;
        if (errorMessage.length > 0) {
            dataClass.formClass += ' ' + dataClass.errorClass;
        }
        return (
			<div className={ClassNames({'basic-input': true, 'input-group': true})}>
				<div className={formClass}>
                    <label className={dataClass.labelClass} htmlFor={rest.name}>
                        {label}
                    </label>
					<img ref={(input) => {this.imgInput = input}} onChange={rest.onChange ? rest.onChange : this.onChange(rest.name)} onBlur={this.activateValidation(rest.name)} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
                <HelpText messages={errorMessage} className={dataClass.errorMessageClass} />
			</div>
		);
	}
};

export default Validation(Strategy)(BasicImage);