"use strict";
/**
 * Module dependencies
 */
import React 			from 'react';
import Utils 			from 'appRoot/js/mixins/logger';
import createReactClass from 'create-react-class';

let Types = React.PropTypes;

export default function wrapper(WrappedComponent) {
  	return createReactClass({
	  	propTypes: {
	        isMounted: Types.bool.isRequired
	    },
	    getDefaultProps: function() {
	        return {
	        	isMounted: false
	        }
	    },
	    getInitialState: function() {
	    	return {
	    		isMounted: this.props.isMounted
	    	}
	    },
	    componentWillMount: function() {
			Utils.Logger.debug('componentWillMount');
		},
		componentDidMount: function() {
			Utils.Logger.debug('componentDidMount');
			this.setState({isMounted: true});
		},
		componentWillUnmount: function() {
			Utils.Logger.debug('componentWillUnmount');
			this.setState({isMounted: false});
		},
		componentWillReceiveProps: function(nextProps) {
			Utils.Logger.debug('componentWillReceiveProps', {nextProps: nextProps});
		},
		shouldComponentUpdate: function(nextProps, nextState) {
			Utils.Logger.debug('shouldComponentUpdate', {nextProps: nextProps, nextState: nextState});
		    return true;
		},
		componentWillUpdate: function(nextProps, nextState) {
			Utils.Logger.debug('componentWillUpdate', {nextProps: nextProps, nextState: nextState});
		},
		componentDidUpdate: function(prevProps, prevState) {
			Utils.Logger.debug('componentDidUpdate', {prevProps: prevProps, prevState: prevState});
		},
	    render: function() {
	    	const { isMounted, ...rest } = this.props;
	      	return (
	      		<WrappedComponent {...rest} isMounted={isMounted} />
	      	);
	    }
  	});
};
