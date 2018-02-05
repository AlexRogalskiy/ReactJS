"use strict";
/**
 * Module dependencies
 */
import React            from 'react';
import update           from 'react-addons-update';
import ClassNames       from 'classnames';
import BasicButton      from './BasicButton';
import BasicTextControl from './BasicTextControl';
import Logger           from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicEditTextControl extends React.Component {
    mixins: [Logger]
    propTypes: {
        data: Types.object,
        isEditing: React.PropTypes.bool,
        item: React.PropTypes.object,
        key: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);
        this.edit = this.edit.bind(this);
    }
    getDefaultProps() {
        return {
            data: {buttonClass: 'btn btn-info btn-lg', iconEditClass: 'glyphicon glyphicon-pencil', iconUpdateClass: 'glyphicon glyphicon-ok', formClass: 'form-group', labelClass: 'control-label', controlClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
            isEditing: false,
            update: null,
            buttonPrefix: 'btn',
            item: {},
            key: ''
        };
    }
    getInitialState() {
        return {
            data: this.props.data,
            isEditing: false,
            update: this.props.update,
            item: this.props.item,
            key: this.props.key
        };
    }
    update(e) {
        this.setState({ isEditing: false });
        var target = e.target.name.substring(1);
        this.refs['t' + target].setState({ isDisabled: true });
        this.props.update(e);
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    edit(e) {
        this.setState({ isEditing: true });
        var target = e.target.name.substring(1);
        this.refs['t' + target].setState({ isDisabled: false });
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    onChange(e) {
        this.setState({ value: e.target.value });
        this.refs['t' + e.target.name].onChange(e);
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    render() {
        const { buttonLabelEdit, buttonLabelUpdate, data, ...rest } = this.props;
        const { buttonClass, iconEditClass, iconUpdateClass, ...restClass } = data;
        rest.data = restClass;
        let elements = this.state.isEditing
                     ? <BasicButton ref={(button) => {this.textButton = button;}} name={this.props.buttonPrefix + this.props.name} onClick={this.update} className={buttonClass}><BasicIcon className={iconUpdateClass} />{buttonLabelUpdate}</BasicButton>
                     : <BasicButton ref={(button) => {this.textButton = button;}} name={this.props.buttonPrefix + this.props.name} onClick={this.edit} className={buttonClass}><BasicIcon className={iconEditClass} />{buttonLabelEdit}</BasicButton>;
        return (
            <BasicTextControl ref={(input) => {this.textControl = input;}} onChange={rest.onChange ? rest.onChange : this.onChange} {...rest}>
                {elements}
            </BasicTextInput>
        );
    }
};