"use strict";
/**
 * Module dependencies
 */
import React            from 'react';
import update           from 'react-addons-update';
import ClassNames       from 'classnames';
import BasicButtonControl from './basicButtonControl';
import BasicTextControl from './basicTextControl';
// import Utils           from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicEditTextControl extends React.Component {
    static propTypes: {
        dataClass: Types.object,
        isEditing: React.PropTypes.bool,
        item: React.PropTypes.object,
        key: React.PropTypes.string
    }
    static defaultProps = {
        dataClass: {buttonClass: 'btn btn-info btn-lg', iconEditClass: 'glyphicon glyphicon-pencil', iconUpdateClass: 'glyphicon glyphicon-ok', formClass: 'form-group', labelClass: 'control-label', controlClass: 'row no-gutters', errorClass: 'has-error', errorMessageClass: 'help-block'},
        isEditing: false,
        update: null,
        buttonPrefix: 'btn',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);
        this.edit = this.edit.bind(this);
        this.state = {
            dataClass: this.props.dataClass,
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
        const { buttonLabelEdit, buttonLabelUpdate, dataClass, ...rest } = this.props;
        const { buttonClass, iconEditClass, iconUpdateClass, ...restClass } = dataClass;
        rest.dataClass = restClass;
        let elements = this.state.isEditing
                     ? <BasicButtonControl ref={(button) => {this.textButton = button;}} name={this.props.buttonPrefix + this.props.name} onClick={this.update} className={buttonClass}><BasicIcon className={iconUpdateClass} />{buttonLabelUpdate}</BasicButtonControl>
                     : <BasicButtonControl ref={(button) => {this.textButton = button;}} name={this.props.buttonPrefix + this.props.name} onClick={this.edit} className={buttonClass}><BasicIcon className={iconEditClass} />{buttonLabelEdit}</BasicButtonControl>;
        return (
            <BasicTextControl ref={(input) => {this.textControl = input;}} onChange={rest.onChange ? rest.onChange : this.onChange} {...rest}>
                {elements}
            </BasicTextControl>
        );
    }
};