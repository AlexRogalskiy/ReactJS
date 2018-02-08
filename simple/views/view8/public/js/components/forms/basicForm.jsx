"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicForm extends React.Component {
  static propTypes: {
    fields: Types.array,
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
    Logger.debug("Fields: " + this.state.fields.inspect);
  }
  render() {
    const self = this;
    const { fields, ...rest } = this.props;
    return (
      <form onSubmit={rest.onSubmit ? rest.onSubmit : rest.onSubmit}>
          <div>
            fields.map(function(item) {
              return <BasicTextControl key={item} label={item.title} onChange={rest.onChange ? rest.onChange : rest.onChange} {...rest} />
            });
          </div>
          <input type="submit" value="Send" />
      </form>
    );
  }
}