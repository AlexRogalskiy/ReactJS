"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';
import Logger     from 'appRoot/js/mixins/logger';
import BasicSubmitButtonStyle from 'appRoot/css/components/elements/basicSubmitButtonControl.css';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicSubmitButtonStyle);

export default class BasicSubmitButtonControl extends React.Component {
	displayName: 'BasicSubmitButtonControl'
	static propTypes: {
		message: Types.string,
		item: Types.object,
		key: Types.string
	}
	static defaultProps = {
        message: '',
        messageInProgress: 'Processing...',
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            message: props.message,
            messageInProgress: props.messageInProgress,
			item: props.item,
			key: props.key
        };
    }
	onClick(e) {
		Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
		//this.props.click(e);
	}
	render() {
		const { item, message, messageInProgress, ...rest } = this.props;
		message = this.props.store.submissionInProgress ? messageInProgress : message;
		const className = Styles({
	      	base: true,
	      	// inProgress: this.props.store.submissionInProgress,
	      	// error: this.props.store.errorOccurred,
	      	disabled: this.props.form.valid,
    	});
		return (
			<button className={className} onClick={this.props.onClick ? this.props.onClick : this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};