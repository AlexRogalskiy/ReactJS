"use strict";
/**
 * Module dependencies
 */
import { ReactDOM } from 'react-dom';
import { Window } from 'window';
import { JQuery } from 'jquery';

import CommentView from 'appRoot/js/components/comments/view'

window.renderCommentView = function () {
    var url = "/api/comments";

    $.get(url).then(
        (comments) => {
            return comments;
        },
        (err) => {
            console.error(url, err);
            return [];
        }
    )
    .always((comments) => {
        ReactDOM.render(React.createElement(CommentView, {
            url: url,
            pollInterval: 2000,
            comments: comments
        }), document.getElementById('content'));
    });
};