"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicForm extends React.Component {
  displayName: 'BasicForm'
  static propTypes: {
    dataClass: Types.object,
    fields: Types.array,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    dataClass: { fieldClass: 'field' },
    fields: [],
    item: {},
    key: ''
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      dataClass: this.props.dataClass,
      fields: this.props.fields,
      item: this.props.item,
      key: this.props.key
    };
  }
  onChange(e) {
    const value = e.target.value;
    this.setState({fields[e.target.name]: value});
  }
  onSubmit(e) {
    e.preventDefault();
    Logger.debug("Fields: " + this.state.fields.inspect);
  }
  render() {
    const self = this;
    const { dataClass, fields, ...rest } = this.props;
    const { fieldClass, ...restClass } = dataClass;
    return (
      <form onSubmit={rest.onSubmit ? rest.onSubmit : self.onSubmit}  {...rest}>
          <div>
            fields.map(function(item) {
              return <BasicTextControl item={item} key={item.id} label={item.label} onChange={rest.onChange ? rest.onChange : self.onChange} className={item.className ? item.className : fieldClass} dataClass={restClass} />
            });
          </div>
          <input type="submit" value="Send" />
      </form>
    );
  }
}