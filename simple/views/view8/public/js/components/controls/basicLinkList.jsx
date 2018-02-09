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
		item: Types.object,
		key: Types.string
	}
    static defaultProps = {
        dataClass: { itemClass: 'link' },
        items: [],
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: this.props.dataClass,
            items: this.props.items,
            item: this.props.item,
            key: this.props.key
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
                        return <Link item={item} key={item.id} to={item.path} onClick={rest.onClick ? rest.onClick : self.onClick} className={item.className ? item.className : itemClass}>{item.name}</Link>
                    });
                </nav>
            <div>
        );
    }
}