"use strict";
/**
 * Module dependencies
 */
import React 	from 'react';
import ReactDOMServer from 'react-dom/server';

import CommentView from 'appRoot/js/components/comments/view'

module.exports = {
    /**
     * Returns a static string to render on the server
     *
     * @param {Object} params
     * @returns {String}
     */
    renderCommentView(params) {
        return ReactDOMServer.renderToString(React.createElement(CommentView, params));
    }
};