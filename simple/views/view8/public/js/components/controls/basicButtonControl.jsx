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
		item: Types.object
	}
	static defaultProps = {
        message: '',
        className: 'btn',
        item: {}
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            message: props.message,
            className: props.className,
			item: props.item
        };
    }
	onClick(e) {
		Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
		if(this.props.onClick) {
			this.props.onClick(e);
		}
	}
	render() {
		const { item, message, ...rest } = this.props;
		rest.className = Styles(rest.className, {
	      	// btn: true,
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	disabled: this.state.isDisabled,
    	});
		return (
			<button onClick={this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};