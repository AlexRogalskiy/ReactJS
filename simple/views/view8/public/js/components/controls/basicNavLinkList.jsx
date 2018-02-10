"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import { NavLink, BrowserRouter }  from 'react-router-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
 
export default class BasicNavLinkList extends React.Component{
    displayName: 'BasicNavLinkList'
	static propTypes: {
        dataClass: Types.object,
        items: Types.array,
		item: Types.object,
		key: Types.string
	}
    static defaultProps = {
        dataClass: { itemClass: 'navlink' },
        items: [],
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item,
            key: props.key
        };
    }
    onClick(e) {
        Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
        // this.props.click(e);
    }
    render() {
        const self = this;
        const { dataClass, items, ...rest } = this.props;
        const { itemClass, ...restClass } = dataClass;
        return 	(
            <div {...rest}>
                <nav>
                    items.map(function(item) {
                        return <NavLink item={item} key={item.id} to={item.path} onClick={rest.onClick ? rest.onClick : self.onClick} className={item.className ? item.className : itemClass}>{item.name}</NavLink>
                    });
                </nav>
            <div>
        );
    }
}