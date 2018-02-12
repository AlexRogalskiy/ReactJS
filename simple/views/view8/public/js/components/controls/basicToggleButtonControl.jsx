"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import Logger     from 'appRoot/js/mixins/logger';
import BasicToggleButtonStyle from 'appRoot/css/components/controls/basicToggleButtonControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicToggleButtonStyle);

export default class BasicToggleButtonControl extends BasicButtonControl {
	displayName: 'BasicToggleButtonControl'
	static propTypes: {
		flipped: Types.bool
	}
	static defaultProps = {
        flipped: false
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            flipped: props.flipped
        };
    }
	onClick(e) {
		super.onClick(e);
		this.flip();
		//this.props.click(e);
	}
	flip() {
    	this.setState({ flipped: !this.state.flipped });
  	}
	render() {
		const { flipped, ...rest } = this.props;
		rest.className = Styles({
	      	btnToggle: true,
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	// disabled: this.state.isDisabled,
	      	flipped: this.state.flipped
    	});
    	this.props = rest;
    	return super.render();
	}
};