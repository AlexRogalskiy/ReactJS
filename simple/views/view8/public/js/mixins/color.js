"use strict";
/**
 * Module dependencies
 */
import Logger from 'appRoot/js/mixins/logger';

const Color = {
	getLuminance: function(color, params = {r: 0.299, g: 0.587, b: 0.114}) {
		color = (color.startsWith('#') ? color.substring(1) : color);
		let c = parseInt(color, 16);
	    let r = (c & 0xFF0000) >> 16;
	    let g = (c & 0x00FF00) >> 8;
	    let b = (c & 0x0000FF);
	    return (params.r * r + params.g * g + params.b * b);
	}
};
//const theme = this.getLuminance(this.props.color) > 160 ? 'dark' : 'light';
export default Color;