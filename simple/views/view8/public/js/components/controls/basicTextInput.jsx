"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
// import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicTextInput extends React.Component {
	static propTypes: {
        dataClass: Types.object,
        item: Types.object,
		key: Types.string
    }
    static defaultProps = {
        dataClass: {controlClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
        className: 'form-control',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: this.props.dataClass,
            className: this.props.className,
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
        const { dataClass, ...rest } = this.props;
		let errorMessage = this.props.getValidationMessages(rest.name);
        let controlClass = dataClass.controlClass;
        if (errorMessage.length > 0) {
            controlClass += ' ' + dataClass.errorClass;
        }
		return (
			<div className={ClassNames({'basic-input': true, 'input-group': true})} {...rest}>
				<div className={controlClass}>
					<input ref={(input) => {this.input = input;}} className={rest.state.className} onChange={rest.onChange ? rest.onChange : this.onChange} {...update(rest, {children: {$set: null}})} />
					{rest.children}
				</div>
				{this.renderHelpText(errorMessage, dataClass.errorMessageClass)}
			</div>
		);
	}
};