"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
// import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
 
export default class BasicNavigation extends React.Component{
	static propTypes: {
		item: Types.object,
		key: Types.string
	}
    static defaultProps = {
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
        return 	<div>
            		<Link to="/">Главная</Link> 
            		<Link to="/products">Товары</Link>
            	</div>;
    }
}