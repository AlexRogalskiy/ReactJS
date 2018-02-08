"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
// import Logger      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
 
export default class BasicNavLink extends React.Component{
	static propTypes: {
        fields: Types.array,
		item: Types.object,
		key: Types.string
	}
    static defaultProps = {
        fields: [],
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
        const self = this;
        const { fields, ...rest } = this.props;
        return 	(
            <div>
                <nav>
                    fields.map(function(item) {
                        return <NavLink item={item} key={item.id} to={item.path} onChange={rest.onChange ? rest.onChange : self.onChange} {...rest}>{item.name}</NavLink>
                    });
                </nav>
            <div>
        );
    }
}