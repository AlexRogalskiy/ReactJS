"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import { Link, BrowserRouter }  from 'react-router-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
 
export default class BasicLink extends React.Component{
    displayName: 'BasicLink'
	static propTypes: {
        dataClass: Types.object,
        items: Types.array,
		item: Types.object
	}
    static defaultProps = {
        dataClass: { itemClass: 'link' },
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item
        };
    }
    onClick(e) {
        Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }
    render() {
        const { dataClass, items, item, onClick, ...rest } = this.props;
        const { itemClass, ...restClass } = dataClass;
        return 	(
            <div {...rest}>
                <nav>
                    items.map(function(item) {
                        return <Link item={item} key={item.id} to={item.path} onClick={this.onClick} className={item.className ? item.className : itemClass}>{item.name}</Link>
                    }.bind(this));
                </nav>
            <div>
        );
    }
}