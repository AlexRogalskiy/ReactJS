"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import Validators from 'appRoot/js/mixins/validators';
import HelpText   from 'appRoot/js/mixins/utility';
// import Logger      from 'appRoot/js/mixins/logger';
import BasicImageInputStyle from 'appRoot/css/components/elements/basicImageInput';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicImageInputStyle);

class BasicImageInput extends React.Component {
	displayName: 'BasicImageInput'
	static propTypes: {
		dataClass: Types.object,
		validator: Types.string,
        item: Types.object
	}
    static defaultProps = {
        dataClass: { imageClass: 'form-control', controlClass: 'row no-gutters', errorMessageClass: 'help-block' },
        className: 'basic-input input-group',
        validator: 'imageInput',
        item: {}
    }
    getValidatorData() {
	    return this.state;
	}
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            validator: props.validator,
			item: props.item
        };
        this.validatorTypes = Validators[props.validator];
    }
    onBlur(field) {
    	return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
			if(this.props.onBlur) {
				this.props.onBlur(event);
			}
	    };
	}
	onChange(field) {
		return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
			if(this.props.onChange) {
				this.props.onChange(event);
			}
	    };
	}
	// getClassName(field) {
	// 	return this.props.isValid(field) ? '' : 'has-error';
	// }
	render() {
		const { dataClass, item, label, onChange, onBlur, className, validator, errors, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
		let errorMessage = getValidationMessages(rest.name);
        const controlClass = Styles(dataClass.controlClass, {
            error: errorMessage.length > 0
        });
        rest.className = dataClass.imageClass;
		// let formClass = dataClass.formClass;
  //       if (errorMessage.length > 0) {
  //           dataClass.formClass += ' ' + dataClass.errorClass;
  //       }
        return (
			<div className={className}>
				<div className={controlClass}>
					<img ref={(input) => {this.imageInput = input}} onChange={this.onChange(rest.name)} onBlur={this.onBlur(rest.name)} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
                <HelpText messages={errorMessage} className={dataClass.errorMessageClass} />
			</div>
		);
	}
};

export default Validation(Strategy)(BasicImageInput);