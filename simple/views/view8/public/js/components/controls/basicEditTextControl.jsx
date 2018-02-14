"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update           from 'react-addons-update';
import ClassNames from 'classnames/bind';

import Logger     from 'appRoot/js/mixins/logger';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicTextControl from 'appRoot/js/components/controls/basicTextControl';
import BasicIcon from 'appRoot/js/components/elements/basicIcon';
import BasicEditTextControlStyle from 'appRoot/css/components/controls/basicEditTextControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicEditTextControlStyle);

export default class BasicEditTextControl extends React.Component {
    displayName: 'BasicEditTextControl'
    static propTypes: {
        dataClass: Types.object,
        validator: Types.string,
        isEditing: Types.bool,
        onUpdate: Types.func,
        onEdit: Types.func,
        buttonLabelEdit: Types.string,
        buttonLabelUpdate: Types.string,
        buttonPrefix: Types.string,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { buttonClass: 'btn btn-info btn-lg', iconEditClass: 'glyphicon glyphicon-pencil', iconUpdateClass: 'glyphicon glyphicon-ok' },
        className: 'editTextInput',
        validator: 'editTextControl',
        isEditing: false,
        onUpdate: null,
        onEdit: null,
        buttonLabelEdit: 'Edit',
        buttonLabelUpdate: 'Update',
        buttonPrefix: 'btn',
        item: {}
    }
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            validator: props.validator,
            isEditing: false,
            onUpdate: props.onUpdate,
            onEdit: props.onEdit,
            buttonLabelEdit: props.buttonLabelEdit,
            buttonLabelUpdate: props.buttonLabelUpdate,
            buttonPrefix: props.buttonPrefix,
            item: props.item
        };
    }
    onUpdate(field) {
        return event => {
            const state = { isEditing: false };
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.refs[field].setState({ isDisabled: true });
            if(this.props.onUpdate) {
                this.props.onUpdate(event);
            }
        };
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    onEdit(field) {
        return event => {
            const state = { isEditing: true };
            //let target = e.target.name.substring(1);
            this.refs[field].setState({ isDisabled: false });
            this.setState(state);
            if(this.props.onEdit) {
                this.props.onEdit(event);
            }
        };
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    onChange(field) {
        return event => {
            const state = { value: event.target.value };
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.setState(state);
            this.refs[field].onChange(event);
            if(this.props.onChange) {
                this.props.onChange(event);
            }
        };
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    render() {
        const { dataClass, item, onChange, buttonLabelEdit, buttonLabelUpdate, buttonPrefix, ...rest } = this.props;
        const { buttonClass, ...restClass } = dataClass;
        const iconButtonClass = Styles(dataClass.iconButtonClass, {
            iconEditClass: this.state.isEditing,
            iconUpdateClass: this.state.isEditing
        });
        rest.dataClass = restClass;
        const elements = this.state.isEditing
                         ? <BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.onUpdate(rest.name)} className={buttonClass}><BasicIcon className={iconButtonClass} />{buttonLabelUpdate}</BasicButtonControl>
                         : <BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.onEdit(rest.name)} className={buttonClass}><BasicIcon className={iconButtonClass} />{buttonLabelEdit}</BasicButtonControl>;
        return (
            <BasicTextControl ref={(input) => {this.textControl = input}} onChange={this.onChange(rest.name)} {...rest}>
                {elements}
            </BasicTextControl>
        );
    }
};