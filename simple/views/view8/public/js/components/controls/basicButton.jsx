"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicButton extends React.Component {
	mixins: [Logger]
	propTypes: {
		message: Types.string,
		item: Types.object,
		key: Types.string
	}
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    getDefaultProps() {
        return {
        	message: '',
        	item: {},
        	key: ''
        };
    }
    getInitialState() {
		return {
			message: this.props.message,
			item: this.props.item,
			key: this.props.key
		};
	}
	onClick(e) {
		this.log(ReactDOM.findDOMNode(this).id + ' clicked');
	}
	render() {
		const { message, ...rest } = this.props;
		return (
			<button onClick={this.props.onClick ? this.props.onClick : this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};