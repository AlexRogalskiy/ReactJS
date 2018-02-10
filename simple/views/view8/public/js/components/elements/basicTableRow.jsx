"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Color      from 'appRoot/js/mixins/color';

let Types = React.PropTypes;

export default class BasicTableRow extends React.Component {
    displayName: 'BasicTableRow'
	static propTypes = {
        dataClass: Types.object,
        columns: Types.array,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { columnClass: 'column' },
        columns: [],
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            columns: props.columns,
            item: props.item,
            key: props.key
        };
    }
	render() {
        const { dataClass, item, ...rest } = this.props;
        const { columnClass, ...restClass } = dataClass;
        const elements = this.state.columns.map(function(item) {
            return (
                <td key={item.id} className={item.className ? item.className : columnClass}>
                    {item.data}
                </td>
            );
        });
        return (
            <tr {...rest}>
                {elements}
            </tr>
        );
	}
};