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
import Logger     from 'appRoot/js/mixins/logger';

import BasicTextInputStyle from 'appRoot/css/components/controls/basicTextInput';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicTextInputStyle);

class BasicTextInput extends React.Component {
    displayName: 'BasicTextInput'
	static propTypes: {
        dataClass: Types.object,
        validator: Types.string,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { inputClass: 'form-control', controlClass: 'row no-gutters', errorMessageClass: 'help-block' },
        className: 'basic-input input-group',
        validator: 'textInput'
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
    // onBlur(field) {
    //     return event => {
    //         let state = {};
    //         state[field] = event.target.value;
    //         Strategy.activateRule(this.validatorTypes, field);
    //         this.setState(state, () => {
    //             this.props.handleValidation(field)(event);
    //         });
    //     };
    // }
    // onChange(field) {
    //     return event => {
    //         let state = {};
    //         state[field] = event.target.value;
    //         this.setState(state, () => {
    //             this.props.handleValidation(field)(event);
    //         });
    //     };
    // }
    onBlur(field) {
        return event => {
            const state = { value: event.target.value };
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
            const state = { value: event.target.value };
            this.setState(state, () => {
                this.props.handleValidation(field)(event);
            });
            console.log('asdfsdaf');
            if(this.props.onChange) {
                this.props.onChange(event);
            }
        };
    }
    // getClassName(field) {
    //     return this.props.isValid(field) ? '' : 'has-error';
    // }
	render() {
        const { dataClass, onChange, onBlur, className, item, validator, errors, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
		const errorMessage = getValidationMessages(rest.name);
        const controlClass = Styles(dataClass.controlClass, {
            error: errorMessage.length > 0
        });
        rest.className = dataClass.inputClass;
        // let controlClass = dataClass.controlClass;
        // if (errorMessage.length > 0) {
        //     controlClass += ' ' + dataClass.errorClass;
        // }
		return (
			<div className={className}>
				<div className={controlClass}>
					<input ref={(input) => {this.textInput = input}} onChange={this.onChange(rest.name)} onBlur={this.onBlur(rest.name)} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
				<HelpText messages={errorMessage} className={dataClass.errorMessageClass} />
			</div>
		);
	}
};

export default Validation(Strategy)(BasicTextInput);