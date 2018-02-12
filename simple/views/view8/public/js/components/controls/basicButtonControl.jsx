"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import Logger     from 'appRoot/js/mixins/logger';
import BasicButtonStyle from 'appRoot/css/components/controls/basicButtonControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicButtonStyle);

export default class BasicButtonControl extends React.Component {
	displayName: 'BasicButtonControl'
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
            message: props.message,
			item: props.item,
			key: props.key
        };
    }
	onClick(e) {
		Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
		if(this.props.click) {
			this.props.click(e);
		}
	}
	render() {
		const { item, message, ...rest } = this.props;
		rest.className = Styles(rest.className, {
	      	btn: true,
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	disabled: this.state.isDisabled,
    	});
    	console.log(rest.className);
		return (
			<button onClick={this.props.onClick ? this.props.onClick : this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};