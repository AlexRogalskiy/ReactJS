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
        item: Types.object,
        key: Types.string
	}
    static defaultProps = {
        dataClass: {labelClass: 'control-label', formClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
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
            dataClass: this.props.dataClass,
			item: this.props.item,
			key: this.props.key
        };
        this.validatorTypes = Validators.imageControl;
    }
    activateValidation(field) {
    	return event => {
	      	let state = {};
	      	state[field] = event.target.label;
	      	Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
	    };
	    // Strategy.activateRule(this.validatorTypes, field);
	    // this.props.handleValidation(field)(e);
	}
	onChange(field) {
		return event => {
	      	let state = {};
	      	state[field] = event.target.label;
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
	    };
		//this.setState({ value: e.target.value });
	}
	getClassName(field) {
		return this.props.isValid(field) ? '' : 'has-error';
	}
	// renderHelpText(message, messageClass) {
 //        return (
 //            <div className={messageClass}>
 //                {message}
 //            </div>
 //        );
 //    }
	render() {
		const { item, dataClass, errors, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
		let errorMessage = getValidationMessages(rest.name);
        if (errorMessage.length > 0) {
            dataClass.formClass += ' ' + dataClass.errorClass;
        }
        return (
			<div className={ClassNames({'basic-input': true})}>
				<div className={dataClass.formClass}>
                    <label className={dataClass.labelClass} htmlFor={rest.name}>
                        {rest.label}
                    </label>
					<img ref={(input) => {this.imgInput = input;}} onChange={rest.onChange ? rest.onChange(rest.name) : this.onChange(rest.name)} onBlur={this.activateValidation(rest.name)} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
                <HelpText errorMessage={errorMessage} errorClass={dataClass.errorMessageClass} />
			</div>
		);
	}
};

export default Validation(Strategy)(BasicImage);