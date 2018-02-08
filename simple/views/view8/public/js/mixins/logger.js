"use strict";
/**
 * Module dependencies
 */
import dateFormat from 'dateformat';

const output = (dateTime, message, ...args) => `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;
const DEFAULT_DATETIME_FORMAT = "dddd, mmmm dS, yyyy, h:MM:ss TT";
const logger = {
	state: {
    	isMounted: false
	},
	debug: function(message, ...args) {
		//console.log(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message, args));
	},
	error: function(message, ...args) {
		//console.error(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message, args));
	},
	warn: function(message, ...args) {
		//console.warn(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message, args));
	},
	info: function(message, ...args) {
		//console.info(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message, args));
	},
	componentWillMount: function() {
		this.log(output(this.time(), 'componentWillMount'));
	},
	componentDidMount: function() {
		this.log(output(this.time(), 'componentDidMount'));
		this.setState({isMounted: true})
	},
	componentWillUnmount: function() {
		this.log(output(this.time(), 'componentWillUnmount'));
		this.setState({isMounted: false})
	},
	componentWillReceiveProps: function(nextProps) {
        console.log(output(this.time(), 'componentWillReceiveProps', {nextProps: nextProps}));
	},
	shouldComponentUpdate: function(nextProps, nextState) {
        console.log(output(this.time(), 'shouldComponentUpdate', {nextProps: nextProps, nextState: nextState}));
        return true;
    },
    componentWillUpdate: function(nextProps, nextState) {
        console.log(output(this.time(), 'componentWillUpdate', {nextProps: nextProps, nextState: nextState}));
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log(output(this.time(), 'componentDidUpdate', {prevProps: prevProps, prevState: prevState}));
    },
	time: function() {
		let currentDate = new Date();
		let currentTime = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));//.toJSON();
		return dateFormat(currentTime, DEFAULT_DATETIME_FORMAT);//.slice(0, 10).replace(/-/g,'/');
	}
};

module.exports = exports = { Logger: logger };