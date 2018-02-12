"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';
import Logger     from 'appRoot/js/mixins/logger';
import BasicToggleButtonStyle from 'appRoot/css/components/elements/basicToggleButtonControl.css';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicToggleButtonStyle);

export default class BasicToggleButtonControl extends React.Component {
	displayName: 'BasicToggleButtonControl'
	static propTypes: {
		message: Types.string,
		flipped: Types.bool,
		item: Types.object,
		key: Types.string
	}
	static defaultProps = {
        message: '',
        flipped: false,
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            message: props.message,
            flipped: props.flipped,
			item: props.item,
			key: props.key
        };
    }
	onClick(e) {
		Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
		this.flip();
		//this.props.click(e);
	}
	flip() {
    	this.setState({ flipped: !this.state.flipped });
  	}
	render() {
		const { item, message, flipped, ...rest } = this.props;
		const className = Styles({
	      	base: true,
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	// disabled: this.state.isDisabled,
	      	flipped: this.state.flipped
    	});
		return (
			<button className={className} onClick={this.props.onClick ? this.props.onClick : this.onClick} {...rest}>
				{message}
			</button>
		);
	}
};