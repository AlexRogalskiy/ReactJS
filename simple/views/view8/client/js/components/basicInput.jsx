"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';

let Types = React.PropTypes;

export default class BasicInput extends React.Component {
	propTypes: {
		dataInfo:  Types.string,
		dataError: Types.string
	}
	state: {
    	isMounted: false,
    	isChecked: false
	}
	componentDidMount() {
	    this.setState({isMounted: true})
	}
	componentWillUnmount(){
	    this.setState({isMounted: false})
	}
	render() {
		const { dataInfo, dataError, ...rest } = this.props
		return (
			<div className={ClassNames({'basic-input': true, 'error': dataError})} {...rest} >
				<input 
					className={dataError ? 'error' : ''} 
					{...update(rest, {children: {$set: null}})} />
				{rest.children}
				<aside>{dataInfo || dataError || ' '}</aside>
			</div>   
		);
	}
};