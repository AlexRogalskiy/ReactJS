"use strict";
/**
 * Module dependencies
 */
import { Strategy } from 'react-validatorjs-strategy';
import { Logger } 	from 'appRoot/js/mixins/logger';

function checkValidity(validator) {
    validator.lang = 'es';
}

const Validators = {
    imageControl: Strategy.createInactiveSchema(
        {
            // author: 'required',
            // text: 'required|min:10|max:50',
            // label: 'required|min:10|max:500',
            // src: 'required',
            // name: 'min:10'
        },
        {
            // 'min.text': 'Enter a message between 10 and 50 characters',
            // 'max.text': 'Enter a message between 10 and 50 characters',
            // "required.label": "Enter valid image :attribute",
            // "required.src": "Enter valid image :attribute",
            // "numeric.name": "Enter valid numeric :attribute"
        },
        function checkValidity(validator) {
            validator.lang = 'es';
        }
    ),
    textInput: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'es';
        }
    ),
    imageInput: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'es';
        }
    ),
    editTextControl: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'es';
        }
    ),
    commentForm: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'es';
        }
    ),
};

export default Validators;