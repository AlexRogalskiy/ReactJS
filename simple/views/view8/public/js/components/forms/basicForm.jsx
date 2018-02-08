"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
// import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicForm extends React.Component {
  static propTypes: {
    fields: Types.arrau,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    fields: [],
    item: {},
    key: ''
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      fields: this.props.fields,
      item: this.props.item,
      key: this.props.key
    };
  }
  onChange(e) {
    let val = e.target.value;
    this.setState({fields[e.target.name]: val});
  }
  onSubmit(e) {
    e.preventDefault();
    alert("Fields: " + this.state.fields.inspect);
  }
  render() {
    const { fields, ...rest } = this.props;
    return (
      <form onSubmit={this.props.onSubmit ? this.props.onSubmit : this.onSubmit}>
          <div>
          fields.map(function(item) {
            return <BasicTextControl key={item} text={item} onChange={this.props.onChange ? this.props.onChange : this.onChange} {...rest} />
          });
          </div>
          <input type="submit" value="Send" />
      </form>
    );
  }
}