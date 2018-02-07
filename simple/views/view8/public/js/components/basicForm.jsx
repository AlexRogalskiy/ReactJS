"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicForm extends React.Component {
  mixins: [Logger]
  propTypes: {
    fields: Types.object,
    item: Types.object,
    key: Types.string
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  } 
  getDefaultProps() {
    return {
      fields: {},
      item: {},
      key: ''
    };
  }
    getInitialState() {
    return {
      fields: this.props.fields,
      item: this.props.item,
      key: this.props.key
    };
  }
  onChange(e) {
    var val = e.target.value;
    this.setState({fields[e.target.name]: val});
  }
  onSubmit(e) {
    e.preventDefault();
    alert("Fields: " + this.state.fields.inspect);
  }
  render() {
    const {fields, ...rest} = this.props;
    return (
            <form onSubmit={this.props.onSubmit ? this.props.onSubmit : this.onSubmit}>
                <p>
                    <label>Имя:</label><br />
                    <input type="text" value={this.state.name} onChange={this.props.onChange ? this.props.onChange : this.onChange}/>
                </p>
                <input type="submit" value="Send" />
            </form>
    );
  }
}