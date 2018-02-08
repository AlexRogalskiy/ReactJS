"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicButtonControl extends React.Component {
	static propTypes: {
		message: Types.string,
		item: Types.object,
		key: Types.string
	}
	static defaultProps = {
        message: '',
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            message: this.props.message,
			item: this.props.item,
			key: this.props.key
        };
    }
	onClick(e) {
		Utils.Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
	}
	render() {
		const { item, message, ...rest } = this.props;
		return (
			<button onClick={this.props.onClick ? this.props.onClick : this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};