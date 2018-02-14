"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Color      from 'appRoot/js/mixins/color';

let Types = React.PropTypes;

export default class BasicTableHeader extends React.Component {
    displayName: 'BasicTableHeader'
	static propTypes = {
        dataClass: Types.object,
        columns: Types.array,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { columnClass: 'column header' },
        columns: [],
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            columns: props.columns,
            item: props.item
        };
    }
	render() {
        const { dataClass, item, ...rest } = this.props;
        const { columnClass, ...restClass } = dataClass;
        const elements = this.state.columns.map(function(item) {
            return (
                <th key={item.id} className={item.className ? item.className : columnClass}>
                    {item.data}
                </th>
            );
        });
        return (
            <tr {...rest}>
                {elements}
            </tr>
        );
	}
};