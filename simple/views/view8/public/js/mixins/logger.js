"use strict";
/**
 * Module dependencies
 */
const output = (dateTime, message) => `Logger => time: ${dateTime}, message: ${message}`;

export default class Logger {
	state: {
    	isMounted: false
	}
	log(message) {
		//console.log(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message));
	}
	error(message) {
		//console.error(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message));
	}
	warn(message) {
		//console.warn(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message));
	}
	info(message) {
		//console.info(String.format('Time: {0}, message: {1}', this.time(), message));
		console.log(output(this.time(), message));
	}
	componentWillMount() {
		this.log(output(this.time(), 'componentWillMount'));
	}
	componentDidMount() {
		this.log(output(this.time(), 'componentDidMount'));
		this.setState({isMounted: true})
	}
	componentWillUnmount() {
		this.log(output(this.time(), 'componentWillUnmount'));
		this.setState({isMounted: false})
	}
	time() {
		let currentDate = new Date();
		let currentTime = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)).toJSON();
		return curTime.slice(0, 10).replace(/-/g,'/');
	}
};