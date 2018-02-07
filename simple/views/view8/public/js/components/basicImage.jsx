"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';

let Types = React.PropTypes;

export default class BasicImage extends React.Component {
	propTypes: {
		dataInfo:  Types.string,
		dataError: Types.string
	}
	constructor(props) {
        super(props);
    }
	render() {
		const { dataInfo, dataError, ...rest } = this.props
		let errorClass = {dataError} ? 'error' : '';
		return (
			<div className={ClassNames({'basic-image': true, 'error': dataError})} {...rest} >
				<img 
					className="{rest.className}, {errorClass}"
					{...update(rest, {children: {$set: null}})} />
				{rest.children}
				<aside>{dataInfo || dataError || ' '}</aside>
			</div>   
		);
	}
};