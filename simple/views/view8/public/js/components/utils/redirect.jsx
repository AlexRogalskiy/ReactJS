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
        item: Types.object
    }
    static defaultProps = {
        path: '',
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            path: props.path,
            item: props.item
        };
    }
    render() {
        return <Redirect to={`/${path}/${this.props.match.params}`} />;
    }
}
