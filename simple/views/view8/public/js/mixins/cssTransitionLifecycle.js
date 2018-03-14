"use strict";
/**
 * Module dependencies
 */
import { React } 			from 'react';
import { Utils } 			from 'appRoot/js/mixins/logger';
import { createReactClass } from 'create-react-class';

let Types = React.PropTypes;

export default function wrapper(WrappedComponent) {
  	return createReactClass({
	  	propTypes: {
	        isMounted: Types.bool.isRequired,
			isActivated: Types.bool.isRequired
	    },
	    getDefaultProps: function() {
	        return {
	        	isMounted: false,
				isActivated: false
	        }
	    },
	    getInitialState: function() {
	    	return {
	    		isMounted: this.props.isMounted,
				isActivated: this.props.isActivated
	    	}
	    },
	    componentWillAppear: function(callback) {
			Utils.Logger.debug('componentWillAppear');
			this.setState({ isMounted: true });
			callback();
		},
		componentDidAppear: function() {
			Utils.Logger.debug('componentDidAppear');
		},
		componentWillEnter: function(callback) {
			Utils.Logger.debug('componentWillEnter');
			this.setState({ isActivated: true });
			callback();
		},
		componentDidEnter: function() {
			Utils.Logger.debug('componentDidEnter');
		},
		componentWillLeave: function(callback) {
			Utils.Logger.debug('componentWillLeave');
			this.setState({ isActivated: false });
			callback();
		},
		componentDidLeave: function() {
			Utils.Logger.debug('componentDidLeave');
		},
	    render: function() {
	    	const { isMounted, isActivated, ...rest } = this.props;
	      	return (
	      		<WrappedComponent isMounted={isMounted} isActivated={isActivated} {...rest} />
	      	);
	    }
  	});
};
