"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class Redirect extends React.Component {
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
            path: this.props.message,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
        return <Redirect to={`/${path}/${this.props.match.params}`} />;
    }
}
