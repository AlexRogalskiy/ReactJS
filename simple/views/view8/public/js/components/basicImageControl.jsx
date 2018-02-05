"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicImage extends React.Component {
	mixins: [Logger]
	propTypes: {
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
        	data: {labelClass: 'control-label', formClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
            item: {},
            key: ''
        };
    }
    getInitialState() {
		return {
			data: this.props.data,
			item: this.props.item,
			key: this.props.key
		};
	}
	onChange(e) {
		this.setState({ value: e.target.value });
	}
	renderHelpText(message, messageClass) {
        return (
            <div className={messageClass}>
                {message}
            </div>
        );
    }
	render() {
		const { data, ...rest } = this.props
		let errorMessage = this.props.getValidationMessages(rest.name);
        if (errorMessage.length > 0) {
            data.formClass += ' ' + data.errorClass;
        }
        return (
			<div className={ClassNames({'basic-input': true})} {...rest}>
				<div className={data.formClass}>
                    <label className={data.labelClass} htmlFor={rest.name}>
                        {rest.label}
                    </label>
					<img ref={(input) => {this.textInput = input;}} onChange={rest.onChange ? rest.onChange : this.onChange} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
				{this.renderHelpText(errorMessage, data.errorMessageClass)}
			</div>
		);
	}
};