"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update           from 'react-addons-update';
// import ClassNames       from 'classnames';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicTextControl from 'appRoot/js/components/controls/basicTextControl';
// import HelpText   from 'appRoot/js/mixins/utility';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicEditTextControl extends React.Component {
    displayName: 'BasicEditTextControl'
    static propTypes: {
        dataClass: Types.object,
        validator: Types.string,
        isEditing: Types.bool,
        update: Types.func,
        edit: Types.func,
        buttonLabelEdit: Types.string,
        buttonLabelUpdate: Types.string,
        buttonPrefix: Types.string,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { buttonClass: 'btn btn-info btn-lg', iconEditClass: 'glyphicon glyphicon-pencil', iconUpdateClass: 'glyphicon glyphicon-ok' },
        validator: '',
        isEditing: false,
        update: null,
        edit: null,
        buttonLabelEdit: 'Edit',
        buttonLabelUpdate: 'Update',
        buttonPrefix: 'btn',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.edit = this.edit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dataClass: this.props.dataClass,
            validator: this.props.validator,
            isEditing: false,
            update: this.props.update,
            edit: this.props.edit,
            buttonLabelEdit: this.props.buttonLabelEdit,
            buttonLabelUpdate: this.props.buttonLabelUpdate,
            buttonPrefix: this.props.buttonPrefix,
            item: this.props.item,
            key: this.props.key
        };
    }
    update(field) {
        return event => {
            const state = { isEditing: false };
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.refs[field].setState({ isDisabled: true });
            this.props.update(event);
        };
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    edit(field) {
        return event => {
            const state = { isEditing: true };
            //let target = e.target.name.substring(1);
            this.refs[field].setState({ isDisabled: false });
            this.setState(state);
            this.props.edit(event);
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
            //this.props.change(event);
        };
        // var self = this;
        // return function (event) {
        //  var state = {};
        //  state[e] = event.target.value;
        //  self.setState(state);
        // };
    }
    render() {
        const { dataClass, item, buttonLabelEdit, buttonLabelUpdate, buttonPrefix, ...rest } = this.props;
        const { buttonClass, iconEditClass, iconUpdateClass, ...restClass } = dataClass;
        rest.dataClass = restClass;
        const elements = this.state.isEditing
                         ? <BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.update(rest.name)} className={buttonClass}><BasicIcon className={iconUpdateClass} />{buttonLabelUpdate}</BasicButtonControl>
                         : <BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.edit(rest.name)} className={buttonClass}><BasicIcon className={iconEditClass} />{buttonLabelEdit}</BasicButtonControl>;
        return (
            <BasicTextControl ref={(input) => {this.textControl = input}} onChange={rest.onChange ? rest.onChange : this.onChange(rest.name)} {...rest}>
                {elements}
            </BasicTextControl>
        );
    }
};