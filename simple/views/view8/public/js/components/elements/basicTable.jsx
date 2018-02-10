"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import BasicTableRow from 'appRoot/js/components/elements/basicTableRow';
import BasicTableHeader from 'appRoot/js/components/elements/basicTableHeader';

let Types = React.PropTypes;

export default class BasicTable extends React.Component {
    displayName: 'BasicTable'
	static propTypes = {
        dataClass: Types.object,
        headers: Types.array,
        rows: Types.array,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { rowClass: 'row', rowHeaderClass: 'row header' },
        headers: [],
        rows: [],
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            headers: props.headers,
            rows: props.rows,
            item: props.item,
            key: props.key
        };
    }
	render() {
        const { dataClass, item, ...rest } = this.props;
        const { rowClass, rowHeaderClass, ...restClass } = dataClass;
        const headers = <BasicTableHeader columns={this.state.headers} className={item.className ? item.className : rowHeaderClass} />;
        const rows = <BasicTableRow columns={this.state.rows} className={item.className ? item.className : rowClass} />;
        return (
            <table {...rest}>
                <thead>
                    {headers}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
	}
};