"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class Redirect extends React.Component {
    displayName: 'Redirect'
    static propTypes: {
        path: Types.string,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        path: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            path: props.message,
            item: props.item,
            key: props.key
        };
    }
    render() {
        return <Redirect to={`/${path}/${this.props.match.params}`} />;
    }
}
